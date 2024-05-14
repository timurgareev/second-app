import { useState, useEffect } from 'react';
import './ObjectTree.css';
import HeaderFilterGroupObjact from './HeaderFilterGroupObjact.js';

function ObjectTree({ onDrawingClick }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log('fetch tree');
    fetch('http://localhost:8080/api/v1/groups')
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        setGroups(data);
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
    <div className="MyComponent2Container">
      <HeaderFilterGroupObjact groups={groups}/>
      <h3>Дерево проектов</h3>
      <div className="tree-container">
        {groups && groups.length > 0 ? (
          renderTree(groups, onDrawingClick)
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

const renderTree = (nodes, onDrawingClick) => (
  <ul className="tree-group-object">
    {nodes.map(node => (
      <li key={node.id}>
        {node.name}
        {node.objects && node.objects.length > 0 && renderObjects(node.objects, onDrawingClick)}
        {node.drawings && node.drawings.length > 0 && renderDrawings(node.drawings, onDrawingClick)}
      </li>
    ))}
  </ul>
);

const renderObjects = (objects, onDrawingClick) => (
  <ul className="tree-object">
    {objects.map(object => (
      <li key={object.id}>
        {object.name}
        {object.projects && object.projects.length > 0 && renderProjects(object.projects, onDrawingClick)}
      </li>
    ))}
  </ul>
);

const renderProjects = (projects, onDrawingClick) => (
  <ul className="tree-project">
    {projects.map(project => (
      <li key={project.id}>
        {project.name}
        {project.zones && project.zones.length > 0 && renderZones(project.zones, onDrawingClick)}
      </li>
    ))}
  </ul>
);

const renderZones = (zones, onDrawingClick) => (
  <ul className="tree-zone">
    {zones.map(zone => (
      <li key={zone.id}>
        {zone.name}
        {zone.drawings && zone.drawings.length > 0 && renderDrawings(zone.drawings, onDrawingClick)}
      </li>
    ))}
  </ul>
);

const renderDrawings = (drawings, onDrawingClick) => (
  <ul className='tree-drawing'>
    {drawings.map(drawing => (
      <li key={drawing.id}>
        <a href="#" onClick={() => onDrawingClick(drawing.id)}>
          {drawing.code}
        </a>
      </li>
    ))}
  </ul>
);

export default ObjectTree;
