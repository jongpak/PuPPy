# Puppy
Puppy is static blog html generator from markdown


## Usage
### Prerequirement
* node.js >= 7
* Bower

```
$ bower install
$ node app.js
Puppy listening on port 8000
```

Now, you can connect http://127.0.0.1:8000 and read/write posts looks like blog.


## Where are my markdown files about posts?
* Your markdown files place `_post` directory
* File name format is `YYYY-MM-dd_title.md`


## Configuration
* See app/config.app.js


## Building static site using commend line interface
* Output path is `output` directory
```
$ node build.js
Posts:
    [1] 2018-01-01_What_is_puppy.md
    [2] 2018-01-02_Building_my_blog.md

Builing index.html
    [OK]

Builing post.html
    [OK] post/2018/0101/What_is_puppy.html
    [OK] post/2018/0102/Building_my_blog.html

Copying media directory
   [OK]

Complete
```