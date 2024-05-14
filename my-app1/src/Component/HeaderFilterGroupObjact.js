import Dropdown from 'react-bootstrap/Dropdown';
import './HeaderFilterGroupObjact.css';

function HeaderFilterGroupObjact({groups}) {
  return (
    <Dropdown className='header-filter-btn-group'>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          {groups.map(group => ( // Используйте groups для создания элементов списка
          <Dropdown.Item key={group.id} href={`#/group/${group.id}`}>
            {group.name}
          </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HeaderFilterGroupObjact;