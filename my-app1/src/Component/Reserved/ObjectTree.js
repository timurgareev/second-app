import React, { useState, useEffect } from 'react';
import './ObjectTree.css'; // Импорт стилей

function ObjectTree() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8080/api/v1/groups')
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        setLoading(false);
      })
      // .then((data) => {console.log(data)})
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
      <h3>Дерево проектов</h3>
      <div className="tree-container">
        {groups && groups.length > 0 ? renderTree(groups) : <p>No data available</p>}
      </div>
    </div>
  );
}

const renderTree = (nodes) => {
  return (
    <ul className="tree">
      {nodes.map(node => (
        <li key={node.id}>
          {node.name}
          {node.objects && node.objects.length > 0 && renderObjects(node.objects)}
        </li>
      ))}
    </ul>
  );
};

const renderObjects = (objects) => {
  return (
    <ul>
      {objects.map(object => (
        <li key={object.id}>
          {object.name}
          {object.projects && object.projects.length > 0 && renderProjects(object.projects)}
        </li>
      ))}
    </ul>
  );
};

const renderProjects = (projects) => {
  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>
          {project.name}
          {project.zones && project.zones.length > 0 && renderZones(project.zones)}
        </li>
      ))}
    </ul>
  );
};

const renderZones = (zones) => {
  return (
    <ul>
      {zones.map(zone => (
        <li key={zone.id}>
          {zone.name}
          {zone.drawings && zone.drawings.length > 0 && renderDrawings(zone.drawings)}
        </li>
      ))}
    </ul>
  );
};

const renderDrawings = (drawings) => {
  return (
    <ul>
      {drawings.map(drawing => (
        <li key={drawing.id}>
          {drawing.code_normal}
        </li>
      ))}
    </ul>
  );
};

export default ObjectTree;
