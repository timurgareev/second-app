import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './HeaderFilterGroupObjact.css';

function HeaderFilterGroupObjact({ groups, onGroupSelect }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group); // Обновляем выбранную группу
    onGroupSelect(group.id); // Вызываем функцию обработчик для передачи ID выбранной группы
  };

  return (
    <Dropdown className='header-filter-btn-group'>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
        {selectedGroup ? selectedGroup.name : 'Select Group'} {/* Отображаем выбранную группу или "Select Group" */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {groups.map(group => (
          <Dropdown.Item 
            key={group.id} 
            href={`#/group/${group.id}`}
            onClick={() => handleGroupSelect(group)}>
            {group.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HeaderFilterGroupObjact;
