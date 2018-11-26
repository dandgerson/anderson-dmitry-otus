# NodeJS Block

## Lesson 3

### Task Description

#### tree - list system files and folders

Write NodeJS script ```tree``` for display the list of system files and
folders.

The results of working of the script must be the object with arrays of

```javascript
{
  files,
  folders
}
```

- the calls of the file system must be asynchronous.
- the sctipt consume entire parameter - *path to folder*
- add ability to exec this script by command ```npm run tree --path```

Example:

```javascript
foo/
├── bar/
│├── bar1.txt
│├── bar2.txt
│└── baz/
├── f1.txt
└── f2.txt
```

then calls with the path: ```foo/```: the script must returns structure:

```json
{
  "files": [
    "foo/f1.txt",
    "foo/f2.txt",
    "foo/bar/bar1.txt",
    "foo/bar/bar2.txt"
  ],
  "dirs": [
    "foo",
    "foo/bar",
    "foo/bar/baz"
  ]
}
```