# TurboPFor 代码阅读

## conf.h

这个文件用于存放一些配置和参数之类的东西

### Compiler 
这里有一些处理编译选项的宏定义
```cpp
// 强制内联
#define ALWAYS_INLINE   inline __attribute__((always_inline))
// 强制不内联
#define NOINLINE        __attribute__((noinline))
// 取消字节对齐
#define _PACKED         __attribute__ ((packed))

// 这两个宏的作用是告诉编译器分支进入哪一个的几率较高
#define likely(x)       __builtin_expect((x),1)
#define unlikely(x)     __builtin_expect((x),0)

// GCC中内置的计算一个32或64位整数中有多少个1
#define popcnt32(_x_)   __builtin_popcount(_x_)
#define popcnt64(_x_)   __builtin_popcountll(_x_)
```

下面这部分是处理bsr指令的内联函数，正如注释中那一段所说，`bsr32`中最低位是$1$，`__bsr32`中最低位是$0$
```cpp
//x,__bsr32:     1:0,2:1,3:1,4:2,5:2,6:2,7:2,8:3,9:3,10:3,11:3,12:3,13:3,14:3,15:3,16:4,17:4,18:4,19:4,20:4,21:4,22:4,23:4,24:4,25:4,26:4,27:4,28:4,29:4,30:4,31:4,32:5
//  x,bsr32: 0:0,1:1,2:2,3:2,4:3,5:3,6:3,7:3,8:4,9:4,10:4,11:4,12:4,13:4,14:4,15:4,16:5,17:5,18:5,19:5,20:5,21:5,22:5,23:5,24:5,25:5,26:5,27:5,28:5,29:5,30:5,31:5,32:6,
static inline int    __bsr32(               int x) {             asm("bsr  %1,%0" : "=r" (x) : "rm" (x) ); return x; }
static inline int      bsr32(               int x) { int b = -1; asm("bsrl %1,%0" : "+r" (b) : "rm" (x) ); return b + 1; }
static inline int      bsr64(uint64_t x          ) { return x?64 - __builtin_clzll(x):0; }
static inline int    __bsr64(uint64_t x          ) { return   63 - __builtin_clzll(x);   }
```

## bitutil.h

### zigzag算法的编码和解码
```cpp
static inline unsigned char  zigzagenc8( signed char    x) { return x << 1 ^   x >> 7;  }
static inline          char  zigzagdec8( unsigned char  x) { return x >> 1 ^ -(x &  1); }

static inline unsigned short zigzagenc16(short          x) { return x << 1 ^   x >> 15;  }
static inline          short zigzagdec16(unsigned short x) { return x >> 1 ^ -(x &   1); }

static inline unsigned       zigzagenc32(int      x)       { return x << 1 ^   x >> 31;  }
static inline int            zigzagdec32(unsigned x)       { return x >> 1 ^ -(x &   1); }

static inline uint64_t       zigzagenc64(int64_t  x)       { return x << 1 ^ x >> 63;  }
static inline  int64_t       zigzagdec64(uint64_t x)       { return x >> 1 ^ -(x & 1); }
```

下面这部分是用SSE2指令集实现的zigzag算法。
```cpp
#if defined(__SSE2__) || defined(__ARM_NEON)

    // 上面这一半是encoder
    static ALWAYS_INLINE __m128i mm_zzage_epi16(__m128i v) { return _mm_xor_si128( mm_slli_epi16(v,1),  mm_srai_epi16(v,15)); }
    static ALWAYS_INLINE __m128i mm_zzage_epi32(__m128i v) { return _mm_xor_si128( mm_slli_epi32(v,1),  mm_srai_epi32(v,31)); }
    //static ALWAYS_INLINE __m128i mm_zzage_epi64(__m128i v) { return _mm_xor_si128( mm_slli_epi64(v,1), _mm_srai_epi64(v,63)); }

    // 这些是decoder
    static ALWAYS_INLINE __m128i mm_zzagd_epi16(__m128i v) { return _mm_xor_si128( mm_srli_epi16(v,1),  mm_srai_epi16( mm_slli_epi16(v,15),15) ); }
    static ALWAYS_INLINE __m128i mm_zzagd_epi32(__m128i v) { return _mm_xor_si128( mm_srli_epi32(v,1),  mm_srai_epi32( mm_slli_epi32(v,31),31) ); }
    //static ALWAYS_INLINE __m128i mm_zzagd_epi64(__m128i v) { return _mm_xor_si128(mm_srli_epi64(v,1), _mm_srai_epi64( m_slli_epi64(v,63),63) ); }

  #endif
```

```cpp
// AVX2指令集中的encoder和decoder
#ifdef __AVX2__
    static ALWAYS_INLINE __m256i mm256_zzage_epi32(__m256i v) { return _mm256_xor_si256(_mm256_slli_epi32(v,1), _mm256_srai_epi32(v,31)); }
    static ALWAYS_INLINE __m256i mm256_zzagd_epi32(__m256i v) { return _mm256_xor_si256(_mm256_srli_epi32(v,1), _mm256_srai_epi32(_mm256_slli_epi32(v,31),31) ); }
#endif
```

Zigzag 的encoder和decoder就这些了

### 一些用于处理位运算和位IO的宏定义
```cpp
// ------------------ bitio genaral macros ---------------------------
  #ifdef __AVX2__
    #if defined(_MSC_VER) && !defined(__INTEL_COMPILER)
#include <intrin.h>
    #else
#include <x86intrin.h>
    #endif
#define bzhi_u32(_u_, _b_)               _bzhi_u32(_u_, _b_)

    #if !(defined(_M_X64) || defined(__amd64__)) && (defined(__i386__) || defined(_M_IX86))
#define bzhi_u64(_u_, _b_)               ((_u_) & ((1ull<<(_b_))-1))
    #else
#define bzhi_u64(_u_, _b_)               _bzhi_u64(_u_, _b_)
    #endif
  #else
#define bzhi_u64(_u_, _b_)               ((_u_) & ((1ull<<(_b_))-1))
#define bzhi_u32(_u_, _b_)               ((_u_) & ((1u  <<(_b_))-1))
  #endif

#define BZHI64(_u_, _b_)                 (_b_ == 64?0xffffffffffffffffull:((_u_) & ((1ull<<(_b_))-1)))
#define BZHI32(_u_, _b_)                 (_b_ == 32?        0xffffffffu  :((_u_) & ((1u  <<(_b_))-1)))

#define bitdef(     _bw_,_br_)           uint64_t _bw_=0; unsigned _br_=0
#define bitini(     _bw_,_br_)           _bw_=_br_=0
//-- bitput ---------
#define bitput(     _bw_,_br_,_nb_,_x_)  (_bw_) += (uint64_t)(_x_) << (_br_), (_br_) += (_nb_)
#define bitenorm(   _bw_,_br_,_op_)      ctou64(_op_) = _bw_; _op_ += ((_br_)>>3), (_bw_) >>=((_br_)&~7), (_br_) &= 7
#define bitflush(   _bw_,_br_,_op_)      ctou64(_op_) = _bw_, _op_ += ((_br_)+7)>>3, _bw_=_br_=0
//-- bitget ---------
#define bitbw(      _bw_,_br_)           ((_bw_)>>(_br_))
#define bitrmv(     _bw_,_br_,_nb_)      (_br_) += _nb_

#define bitdnorm(   _bw_,_br_,_ip_)      _bw_ = ctou64((_ip_) += ((_br_)>>3)), (_br_) &= 7
#define bitalign(   _bw_,_br_,_ip_)      ((_ip_) += ((_br_)+7)>>3)

#define BITPEEK32(  _bw_,_br_,_nb_)      BZHI32(bitbw(_bw_,_br_), _nb_)
#define BITGET32(   _bw_,_br_,_nb_,_x_)  _x_ = BITPEEK32(_bw_, _br_, _nb_), bitrmv(_bw_, _br_, _nb_)
#define BITPEEK64(  _bw_,_br_,_nb_)      BZHI64(bitbw(_bw_,_br_), _nb_)
#define BITGET64(   _bw_,_br_,_nb_,_x_)  _x_ = BITPEEK64(_bw_, _br_, _nb_), bitrmv(_bw_, _br_, _nb_)

#define bitpeek57(  _bw_,_br_,_nb_)      bzhi_u64(bitbw(_bw_,_br_), _nb_)
#define bitget57(   _bw_,_br_,_nb_,_x_)  _x_ = bitpeek57(_bw_, _br_, _nb_), bitrmv(_bw_, _br_, _nb_)
#define bitpeek31(  _bw_,_br_,_nb_)      bzhi_u32(bitbw(_bw_,_br_), _nb_)
#define bitget31(   _bw_,_br_,_nb_,_x_)  _x_ = bitpeek31(_bw_, _br_, _nb_), bitrmv(_bw_, _br_, _nb_)
```

## fc.h & fc.c

这对文件用于处理浮点和整数压缩，我只做bvzenc的部分，也即是下面这一部分。

```cpp
//<fc.h>
//----------- Zigzag (bit/io) -------------------------------------------------------
size_t bvzenc8(     uint8_t       *in, size_t n, unsigned char *out, uint8_t  start);
size_t bvzdec8(     unsigned char *in, size_t n, uint8_t       *out, uint8_t  start);
size_t bvzenc16(    uint16_t      *in, size_t n, unsigned char *out, uint16_t start);
size_t bvzdec16(    unsigned char *in, size_t n, uint16_t      *out, uint16_t start);
size_t bvzenc32(    uint32_t      *in, size_t n, unsigned char *out, uint32_t start);
size_t bvzdec32(    unsigned char *in, size_t n, uint32_t      *out, uint32_t start);
size_t bvzenc64(    uint64_t      *in, size_t n, unsigned char *out, uint64_t start);
size_t bvzdec64(    unsigned char *in, size_t n, uint64_t      *out, uint64_t start);
```

这部分在`fc.c`文件中的实现如下，首先是一个overflow的处理
```cpp
#define OVERFLOW if(op >= out_) { 
    *out++ = 1<<4; /*bitini(bw,br); bitput(bw,br,4+3,1<<4); bitflush(bw,br,out);*/ 
    memcpy(out,in,n*sizeof(in[0])); 
    return 1+n*sizeof(in[0]); 
}
```


```cpp
//-------- Zigzag with bit/io + RLE --------------------------------------------------------------------------
// 这个TEMPLATE2是用来写多个函数的
size_t TEMPLATE2(bvzenc,USIZE)(uint_t *in, size_t n, unsigned char *out, uint_t start) {
    uint_t        *ip = in, *pp = in,dd;
    unsigned char *op = out, *out_ = out+n*sizeof(in[0]);

    // bw : buffer writer : br : buffer reader 
    bitdef(bw,br); // 定义一个bit， 宏声明为 #define bitdef(_bw_,_br_) uint64_t _bw_=0; unsigned _br_=0

    // 下面是《早年匿名函数写法》
    /*
        这个函数应该是对_d_进行zigzag的编码并写入buffer
    */
    #define FE(_pp_, _ip_, _d_, _op_,_usize_) do {\
        uint64_t _r = _ip_ - _pp_;\
        if(_r > NL) { _r -= NL; unsigned _b = (bsr64(_r)+7)>>3; bitput(bw,br,4+3+3,(_b-1)<<(4+3)); bitput64(bw,br,_b<<3, _r, _op_); bitenorm(bw,br,_op_); }\
        else while(_r--) { bitput(bw,br,1,1); bitenorm(bw,br,_op_); }\
        _d_ = TEMPLATE2(zigzagenc,_usize_)(_d_);\
        if(!_d_)                     bitput(bw,br,    1,       1);\
        else if(_d_ <  (1<< (N2-1))) bitput(bw,br, N2+2,_d_<<2|2);\
        else if(_d_ <  (1<< (N3-1))) bitput(bw,br, N3+3,_d_<<3|4);\
        else if(_d_ <  (1<< (N4-1))) bitput(bw,br, N4+4,_d_<<4|8);\
        else { unsigned _b = (TEMPLATE2(bsr,_usize_)(_d_)+7)>>3; bitput(bw,br,4+3,(_b-1)<<4); TEMPLATE2(bitput,_usize_)(bw,br, _b<<3, _d_,_op_); }\
        bitenorm(bw,br,_op_);\
    } while(0)

    if(n > 4)
        for(; ip < in+(n-1-4);) {
            dd = ip[0] - start; start = ip[0]; if(dd) goto a; ip++;
            dd = ip[0] - start; start = ip[0]; if(dd) goto a; ip++;
            dd = ip[0] - start; start = ip[0]; if(dd) goto a; ip++;
            dd = ip[0] - start; start = ip[0]; if(dd) goto a; ip++;   PREFETCH(ip+256,0);
            continue;
            a:;
            FE(pp,ip, dd, op,USIZE);
            pp = ++ip;        OVERFLOW;
        }

    for(;ip < in+n;) {
        dd = ip[0] - start; start = ip[0]; if(dd) goto b; ip++;
        continue;
        b:;
        FE(pp,ip, dd, op,USIZE);
        pp = ++ip; OVERFLOW;
    }
    if(ip > pp) {
        dd = ip[0] - start; start = ip[0];
        FE(pp, ip, dd, op, USIZE); OVERFLOW;
    }
    bitflush(bw,br,op);
    return op - out;
}

```