import { useCallback, useId, useMemo } from "react"

interface FileInputProps {
  onUpload: (file: File) => Promise<any> | void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

interface FileInputReturn {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
  input: JSX.Element
}

export const useFileInput = ({ onUpload, inputProps = {} }: FileInputProps): FileInputReturn => {
  const id = useId()

  const handleClick = useCallback(() => {
    const fileInput = document.getElementById(`${id}-hidden-file-input`) as HTMLInputElement
    fileInput?.click()
  }, [id])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          onUpload(file)
        })
      }
    },
    [onUpload]
  )

  return useMemo(
    () => ({
      handleClick,
      input: (
        <input
          type="file"
          id={`${id}-hidden-file-input`}
          style={{ width: 0, height: 0, opacity: 0, position: "absolute", pointerEvents: "none" }}
          onChange={handleFileChange}
          {...inputProps}
        />
      ),
    }),
    [handleClick, handleFileChange, id, inputProps]
  )
}
