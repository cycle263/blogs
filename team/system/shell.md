## 常用命令

* 管道命令

`ps -ef | grep java`     查看所有java进程

* 文件移动

`mv [options]`    源文件或目录 目标文件或目录

`mv mysql57-community-release-el7-8.noarch.rpm  /usr/local/mysql/`

* 查看操作系统位数

`uname -a`

* 查看文件内容

cat     由第一行开始显示内容，并将所有内容输出

cat    fileName  |grep word 筛选文件中所有包含word的行

tac     从最后一行倒序显示内容，并将所有内容输出

more    根据窗口大小，一页一页的现实文件内容

less    和more类似，但其优点可以往前翻页，而且进行可以搜索字符

head    只显示头几行

tail    只显示最后几行

nl      类似于cat -n，显示时输出行号

tailf   类似于tail -f 

* less命令

q:退出

空格:下一页

b:上一页

g:到第一行

G:到结尾

/pattern 向下查找模式为pattern的词

/ 向下查找上一次使用的模式的词

?pattern 向上查找模式为pattern的词

? 向上查找上一次使用的模式的词

* yum命令

`yum -y remove  fileName`  卸载程序

`yun list installed fileName` 查看安装列表

