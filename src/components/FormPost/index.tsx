
import { useEffect, useState } from "react";
import { IPost } from "../../types/IPost";
import "./styles.css"

interface FormPostProps {
  onSubmit: (values: any) => void;
  onUpdate: (values: any) => void;
  updateValues?: IPost;
}

const FormPost = ({ onSubmit, onUpdate, updateValues }: FormPostProps) => {
  const [data, setData] = useState(updateValues as Partial<IPost>)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "relationship_content" || name === "author") {
      const converttedValue = value.split(", ");

      setData({
        ...data,
        [name]: converttedValue
      })
    } else {
      setData({ ...data, [name]: value });
    }

  }

  useEffect(() => {
    setData(updateValues as Partial<IPost>)
  }, [updateValues])


  return (

    <form className="form-container">
      <div className="form-group">
        <label htmlFor="title">Título do conteúdo:</label>
        <input type="text" name="title" value={data.title} onChange={handleInputChange} placeholder="Título do conteúdo" />
      </div>
      <div className="form-group">
        <label htmlFor="title">Autores do conteúdo:</label>
        <input type="text" name="author" value={data.author} onChange={handleInputChange} placeholder="Autores do conteúdo" />
        <span>Digite autores separado por vírgula</span>
      </div>
      <div className="form-group">
        <label htmlFor="title">Assuntos relacionado:</label>
        <input type="text" name="relationship_content" value={data.relationship_content} onChange={handleInputChange} placeholder="Assuntos Relacionados" />
        <span>Digite assuntos relacionado separado por vírgula</span>
      </div>
      {Object.values(updateValues || {}).length ? (
        <button type="button" onClick={() => onUpdate(data)}>
          EDITAR
        </button>
      ) : (
        <button type="button" onClick={() => onSubmit(data)}>
          CADASTRAR
        </button>
      )}
    </form>
  )
}

export default FormPost;