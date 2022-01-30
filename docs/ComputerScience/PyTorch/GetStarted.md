---
title: PyTorch 初学
---

> 记录学习Pytorch的文档，大部分摘抄自官方文档

## Quick start

### Work with data

PyTorch中有两种操作数据的组件：`torch.utils.data.DataLoader`和`torch.utils.data.Dataset`。`Dataset`中存储带标签的数据。

PyTorch提供了domain-spedifi的各种库，如`TorchText`，`TorchVision`和`TorchAudio`，它们都有数据集，这里我们先用`TorchVision`。

可以下载训练数据集和测试数据集
```py
# Download training data from open datasets.
training_data = datasets.FashionMNIST(
    root="data",
    train=True,
    download=True,
    transform=ToTensor(),
)

# Download test data from open datasets.
test_data = datasets.FashionMNIST(
    root="data",
    train=False,
    download=True,
    transform=ToTensor(),
)
```

把`DataSet`当做一个参数传进`DataLoader`中，`DataLoader`会把它整成一个iterable的东西，还支持batching, sampling, shuffling等各种操作。

```py
batch_size = 64

# Create data loaders.
train_dataloader = DataLoader(training_data, batch_size=batch_size)
test_dataloader = DataLoader(test_data, batch_size=batch_size)
```

### Create Models

为了在PyTorch中定义一个neural network， 我们需要建立一个继承自`nn.Module`的类，在`__init__`中定义神经网络的layers。在`forward`函数中，我们定义数据如何通过神经网络，示例代码如下。

```py
# Get cpu or gpu device for training.
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using {device} device")

# 显然我没有cuda

# Define model
class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        # Flatten : 把一个tensor摊开
        self.flatten = nn.Flatten()
        # 定义各个layers
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10)
        )

    def forward(self, x):
        # 先把输入flatten
        x = self.flatten(x)
        # 把处理过的输入扔到神经网络中
        logits = self.linear_relu_stack(x)
        # 返回linear_relu_stack处理的结果
        return logits

model = NeuralNetwork().to(device)
print(model)
```
### Optimizing the Model Parameters

为了训练模型，我们需要一个损失函数和一个optimizer

比如这里定义
```py
loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(model.parameters(), lr = 1e-3)
```

还需要定义怎么训练模型，把`dataloader`，`model`，`loss_fn`和`optimizer`都一起扔进去。

```py
def train(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    model.train()
    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)

        # Backpropagation
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if batch % 100 == 0:
            loss, current = loss.item(), batch * len(X)
            print(f"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]")
```

训练之后就是test。

```py
def test(dataloader, model, loss_fn):
    size = len(dataloader.dataset)
    num_batches = len(dataloader)
    model.eval()
    test_loss, correct = 0, 0
    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            pred = model(X)
            test_loss += loss_fn(pred, y).item()
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()
    test_loss /= num_batches
    correct /= size
    print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")
```

### Saving Models

训完模型当然要把它存起来。
```py
torch.save(model.state_dict(), "model.pth")
print("Saved PyTorch Model State to model.pth")
```

### Loading Model

有了模型当然要拿出来用，先把模型加载出来。
```py
model = NeuralNetwork()
model.load_state_dict(torch.load("model.pth"))
```

下一步是用模型做预测
```py
classes = [
    "T-shirt/top",
    "Trouser",
    "Pullover",
    "Dress",
    "Coat",
    "Sandal",
    "Shirt",
    "Sneaker",
    "Bag",
    "Ankle boot",
]

model.eval()
x, y = test_data[0][0], test_data[0][1]
with torch.no_grad():
    pred = model(x)
    predicted, actual = classes[pred[0].argmax(0)], classes[y]
    print(f'Predicted: "{predicted}", Actual: "{actual}"')
```


## Tensors

现在开始学习各个细节。

在PyTorch中，我们用tensor去encode模型的输入和输出，以及模型的参数。

PyTorch中的Tensor和Numpy中的ndarray差不多，但是tensor在GPU上跑的快一些。（tensor还可以和ndarray共用一块内存）。Tensor也对自动差分有所优化。

### Initializing a Tensor

首先可以直接从数据生成tensor，所有类型可以自动推断。

```py
data = [[1, 2],[3, 4]]
x_data = torch.tensor(data)
```

tensor也可以从 Numpy中生成，用`torch.from_numpy(np_array)`就行了。

我们也可以从另一个tensor生成一个tensor，保持它的shape和datatype，例如我们可以从一个已知的tensor`x_data`中生成全是$1$的相同形状的tensor，或者生成shape相同但是数据是随机填充的tensor
```py
x_ones = torch.ones_like(x_data) # retains the properties of x_data
print(f"Ones Tensor: \n {x_ones} \n")

x_rand = torch.rand_like(x_data, dtype=torch.float) # overrides the datatype of x_data
print(f"Random Tensor: \n {x_rand} \n")
```

当然`rand`，`ones`，`zeros`这些操作也可以指定shape来完成。
```py
shape = (2,3,)
rand_tensor = torch.rand(shape)
ones_tensor = torch.ones(shape)
zeros_tensor = torch.zeros(shape)

print(f"Random Tensor: \n {rand_tensor} \n")
print(f"Ones Tensor: \n {ones_tensor} \n")
print(f"Zeros Tensor: \n {zeros_tensor}")
```

### Attributes of a Tensor

一个Tensor有对应的shape, datatype, and the device。可以直接查看。
```py
tensor = torch.rand(3,4)

print(f"Shape of tensor: {tensor.shape}")
print(f"Datatype of tensor: {tensor.dtype}")
print(f"Device tensor is stored on: {tensor.device}")
```

### Operations on Tensors

据说有超过100种通俗易懂的操作。
> Over 100 tensor operations, including arithmetic, linear algebra, matrix manipulation (transposing, indexing, slicing), sampling 

tensor默认都是在CPU上跑的，我们需要显式把它整到GPU上。
```py
# We move our tensor to the GPU if available
if torch.cuda.is_available():
    tensor = tensor.to('cuda')
```

用这玩意的方式是numpy-like的
```py
tensor = torch.ones(4, 4)
print('First row: ', tensor[0])
print('First column: ', tensor[:, 0])
print('Last column:', tensor[..., -1])
tensor[:,1] = 0
print(tensor)
```

这玩意还可以很方便的Joining tensors，用`torch.cat([tensor, tensor], dim = 1)`就完了。

还可以做算术运算，注意`matmul`是`@`，`mul`是element-wise的乘法，对应的是`*`。

如果tensor中只有一个item，可以用`.item`给它弄出来。

在函数后面加个`_`，就可以让函数变成In-place的operations。比如`tensor.add_(x)`就会给`tensor`中的每个元素加上$x$。

### Bridge with Numpy

之前说到过PyTorch中的tensor可以和Numpy中的ndarray共享同一块内存，下面就是tensor to numpy array的操作方式。
```py
x = torch.ones(5)
n = x.numpy()
```

当然也可以numpy array to pytorch tensor。
```py
x = np.ones(5)
t = torch.form_numpy(n)
```
此时它们也是共享内存的，任何对`x`的操作都会修改`t`，反之同理。

## Datasets & DataLoaders

摘抄一段官方文档中的话。
>Code for processing data samples can get messy and hard to maintain; we ideally want our dataset code to be decoupled from our model training code for better readability and modularity. PyTorch provides two data primitives: `torch.utils.data.DataLoader` and `torch.utils.data.Dataset` that allow you to use pre-loaded datasets as well as your own data. Dataset stores the samples and their corresponding labels, and DataLoader wraps an iterable around the Dataset to enable easy access to the samples.

### Loading a Dataset

我们再回看一下Quick Start中引入数据集的代码。

```py
training_data = datasets.FashionMNIST(
    root="data",                  # 数据保存位置
    train=True,                   # 是否是训练数据
    download=True,                # 如果root所指的地方没有数据，要不要从网上下一个
    transform=ToTensor()          # feature的transformation
)

test_data = datasets.FashionMNIST(
    root="data",
    train=False,
    download=True,
    transform=ToTensor()
)
```

### Iterating and Visualizing the Dataset

`Datasets`可以随机寻址，下面的实例代码用matplotlib将数据可视化。

```py
labels_map = {
    0: "T-Shirt",
    1: "Trouser",
    2: "Pullover",
    3: "Dress",
    4: "Coat",
    5: "Sandal",
    6: "Shirt",
    7: "Sneaker",
    8: "Bag",
    9: "Ankle Boot",
}
figure = plt.figure(figsize=(8, 8))
cols, rows = 3, 3
for i in range(1, cols * rows + 1):
    sample_idx = torch.randint(len(training_data), size=(1,)).item() # 整一个随机数出来
    img, label = training_data[sample_idx]                           # 取出训练数据
    figure.add_subplot(rows, cols, i)                                # 加一个子图
    plt.title(labels_map[label])                                     # 把标签画上
    plt.axis("off")                                                 
    plt.imshow(img.squeeze(), cmap="gray")                           # 把图整上去
plt.show()
```

### Creating a Custom Dataset for your files

有时也需要制作个性化的Dataset。一个custom的数据集需要三个函数`__init__`，`__len__`和`__getitem__`。