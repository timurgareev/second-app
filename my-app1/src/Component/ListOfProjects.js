import React, { useState, useEffect } from 'react';
import './ListOfProjects.css';
import ApiService from '../services/ApiService';

function ListOfProjects({ drawingId }) {
    const [drawing, setDrawing] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiService = new ApiService();

    useEffect(() => {
        fetchData();
    }, [drawingId]); 

    // const fetchData = () => {
    //     if (!drawingId) {
    //         setDrawing(null);
    //         setLoading(false);
    //         return;
    //     }

    //     fetch(`http://localhost:8080/api/v1/drawings/${drawingId}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Received data:', data);
    //             setDrawing(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Ошибка при получении данных:', error);
    //             setLoading(false);
    //         });
    //         console.log('fetch list draw');
    // };
    const fetchData = () => {
        console.log('fetch drawing');
        apiService.getDrawingsById(drawingId)
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
        return <p>Выберите Шифр проекта - No data available</p>;
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
            <p>Description: {drawing.description}</p>
            <p>Revision:</p>
            <ul>
                {drawing.revision.map(rev => (
                    <li key={rev.id} >
                        <div>
                            <div className='inline'>№{rev.rateNumber}</div>
                            <div className='inline'>изм. {rev.name}</div>
                            <div className='inline'>{rev.status}</div>
                            <div className='inline'>вх: {rev.dataInbox} исх: {rev.dateOutbox}</div>
                            <div className='inline'>ВПР: {rev.inproducrionDateSystem}</div>
                            <div className='inline'>посл: {rev.isLatest}</div>
                            <div className='inline'>comment: {rev.comment1}</div>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListOfProjects;
