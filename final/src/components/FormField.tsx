interface FormFieldProps {
    label: string,
    actualValue: string,
    onTyping: (v: string) => void,
    typeField: string,
    errorMessage?: string
}

export default function FormField({label, actualValue, onTyping, typeField, errorMessage}: FormFieldProps) {
    return <>
        <label>
            {label}
            <input type={typeField} value={actualValue} onChange={(e) => {onTyping(e.target.value)}} />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
    </>
}