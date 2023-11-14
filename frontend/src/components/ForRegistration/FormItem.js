import { Form, FormLabel } from "react-bootstrap";
import { useState } from "react";

export const FormItem =  ({ item, onChange, answer, answers })  => {

  const [currentValue, setCurrentValue] = useState(answer || null);

  const handleChange = (value, category) => {
    setCurrentValue(value);
    onChange(value, category);
  }

  const switchType = {
    'text' : () => {
      return (
        <>
          <Form.Label>{item.label}</Form.Label>
          <Form.Control
            type="text"
            id={item.label}
            onChange={(e) => handleChange(e.target.value, item.value)} 
            value={currentValue}
          />
        </>
      )
    },
    'password' : () => {
      return (
        <>
          <Form.Label>{item.label}</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            onChange={(e) => handleChange(e.target.value, item.value)} 
            value={currentValue}
             />
        </>
      )
    },
    'select': () => {
      return (
        <div className="mt-2">
          <Form.Select aria-label={item.label} 
           value={currentValue}
           onChange={(e) => handleChange(e.target.value, item.value)} >
            <option>{item.label}</option>
            {
              item.options.map((opt, index) => {
                return (
                  <option value={opt}>{opt}</option>
                )
              })
            }
          </Form.Select>
        </div>
        )
    },
    'information': () => {
      console.log(answers)
      const login = answers[1] ? answers[1]['login'] : '-'
      const name = answers[2] ? answers[2]['name'] : '-'
      const surname = answers[2] ? answers[2]['surname'] : '-'
      const identNumber = answers[3] ? answers[3]['identNumber'] : '-'
      return (
        <FormLabel>
          <div>{item.label}</div>
          <div>Ваш логин {login}</div>
          <div>Ваше имя {name}</div>
          <div>Ваша фамилия {surname}</div>
          <div>Ваш идентификационный номер {identNumber}</div>
        </FormLabel>
      )
    }
  
  }
  if(item.type in switchType)
    return switchType[item.type]();
  else
    return (<div>Error</div>)
}
