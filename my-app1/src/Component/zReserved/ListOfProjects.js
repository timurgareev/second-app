import React, {useState, useEffect} from "react";

function ListOfProjects(){
    const [shifr, setShifr] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = () => {
        fetch('http://localhost:8080/api/v1/drawings')
          .then(response => response.json())
          .then(data => {
            setShifr(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Ошибка при получении данных:', error);
            setLoading(false);
          });
      };

      if (loading) {
        return <p>Loading...</p>;
      }

      return (
        <div className="MyComponent1Container"> {/* Обертка для компонента */}
          <h3>Список проектов</h3>
          <div className="tree-container">
            {shifr && shifr.length > 0 ? renderTree(shifr) : <p>No data available</p>}
          </div>
        </div>
      );
    }
    
    const renderTree = (nodes) => {
      return (
        <ul className="tree">
          {nodes.map(node => (
            <li key={node.id}>
              ID: {node.id}; Name: {node.code_normal}; Mark: {node.discipline && node.discipline.mark_name} 
            </li>
          ))}
        </ul>
      );
    };

    
export default ListOfProjects;