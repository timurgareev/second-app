// import {Container, Row, Col} from 'react-bootstrap';
// import ObjectTree from './ObjectTree';
// import ListOfProjects from './ListOfProjects';

// const BootstrapTest = () => {
//     return (
//         <Container fluid>
//             <Row>
//                 <Col xs={3}>
//                     <ObjectTree/>
//                 </Col>
//                 <Col xs={6}>
//                     <ListOfProjects/>
//                 </Col>
//                 <Col xs={3}>3 of 3</Col>
//             </Row>
//         </Container>
//     )   
// }
// export default BootstrapTest;
import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import ObjectTree from './ObjectTree';
import ListOfProjects from './ListOfProjects';
import Header from './Header';
import HeaderFilterGroupObjact from './HeaderFilterGroupObjact';

const BootstrapTest = () => {
    // Создаем состояние для хранения ID выбранного рисунка
    const [selectedDrawingId, setSelectedDrawingId] = useState(null);

    // Функция для обработки клика на рисунок в ObjectTree
    const handleDrawingClick = (drawingId) => {
        setSelectedDrawingId(drawingId); // Обновляем selectedDrawingId при клике на рисунок
    };

    return (
        <Container fluid>
            <Row>
                
                <Header/>
                Navigation
                <HeaderFilterGroupObjact/>
            </Row>
            <Row>
                <Col xs={3}>
                    {/* Передаем функцию handleDrawingClick в компонент ObjectTree */}
                    <ObjectTree onDrawingClick={handleDrawingClick} />
                </Col>
                <Col xs={6}>
                    {/* Передаем selectedDrawingId в компонент ListOfProjects */}
                    <ListOfProjects drawingId={selectedDrawingId} />
                </Col>
                <Col xs={3}>3 of 3</Col>
            </Row>
        </Container>
    );
}

export default BootstrapTest;
