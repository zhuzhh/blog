# node

### Buffer的理解，以及应用场景
一是什么？  
`Buffer`在内存中开辟一片区域(初始大小是8kb)，用来存储二进制数据的
node在处理网络协议、操作数据库、处理图片、接收上传的文件等，在网络流和文件操作中，要处理大量的二进制数据
`Buffer`中存储的是二进制数据，起形式可以理解为一个数据，每一项都可以保保存8位二进制

二使用方法
无需`require`引入，可直接使用  
- Buffer.from()
- Buffer.alloc()

Buffer.form
```
const b1 = Buffer('10')
const b2 = Buffer('10', 'utf-8')
const b3 = Buffer([10])
const b4 = Buffer(b3)
```

Buffer.alloc
```
const b1 = Buffer.alloc(10) // 创建一个大小为10个字节的缓冲区
const b2 = Buffer.alloc(10, 1) // 10字节的Buffer，其中全部填充1
```

三应用场景
- io操作
- 加密操作
- zlib.js 解压、压缩操作

