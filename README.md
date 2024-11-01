# use-file-input
Simple hidden file input handler

### Usage
```jsx
const AddImage = () => {
  const file = useFileInput({
    onUpload: (file) => {
      console.log('Uploading file...', file)
    },
    inputProps: {
      accept: "image/*",
    },
  })

  return (
    <button onClick={file.handleClick}>
      {file.input}
      Add image
    </button>
  )
};
```
