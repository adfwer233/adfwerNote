from glob import glob
import os

f = glob(r'source/*.jpg')

tmp = [x[7:-4] for x in f]
print([x[7:-4] for x in f])

for item in tmp:
    os.system(f'touch > {item}.md')

    fout = open(f'{item}.md', 'w')

    fout.write('---\n')
    fout.write(f'title: "{item}"\n')
    fout.write('---\n')
    fout.write(f'![](source/{item}.jpg)\n')

    fout.close()