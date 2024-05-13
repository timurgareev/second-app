import React, { useState, useEffect } from 'react';
import './ListOfProjects.css';

function ListOfProjects({ drawingId }) {
    const [drawing, setDrawing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [drawingId]); 

    const fetchData = () => {
        if (!drawingId) {
            setDrawing(null);
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/api/v1/drawings/${drawingId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Received data:', data);
                setDrawing(data);
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

    if (!drawing) {
        return <p>No data available</p>;
    }

    return (
        <div className="MyComponent1Container">
            <h3>Project Details</h3>
            <div className="project-details">
                {renderDrawingDetails(drawing)}
            </div>
        </div>
    );
}

const renderDrawingDetails = (drawing) => {
    if (!drawing || !drawing.mark || !drawing.revision) {
        return <p>Data is incomplete</p>;
    }

    return (
        <div className='project-list-items'>
            <p>ID: {drawing.id}</p>
            <p>Code: {drawing.code}</p>
            <p>State: {drawing.state}</p>
            <p>Discipline: {drawing.mark.markKey}</p>
            <p>groupDiscipline: {drawing.mark.markReadDTO.discipline.groupDisciplinesReadDTO.name}</p>
            <p>Revision:</p>
            <ul>
                {drawing.revision.map(rev => (
                    <li key={rev.id}>{rev.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListOfProjects;
