import React, { Fragment, useState, useEffect } from 'react';
import EditName from './edit-name';

const ListNames = () => {
    const [names, setNames] = useState([]);

    const getNames = async () => {
        try {
            const fetchedNames = await fetch('http://localhost:8080/names');
            const jsonNames = await fetchedNames.json();
            setNames(jsonNames);
            console.log(jsonNames);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getNames();
    }, []);

    return (
        <Fragment>
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">Name</th>
                        <th scope="col">Origin</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {names.map((item, index) => {
                        return (
                        <tr key={item.name_id}>
                            <th scope="row">{++index}</th>
                            <td>{item.name}</td>
                            <td>{item.origin_language}</td>
                            <td>{item.gender}</td>
                            <td><EditName currentName={item}/></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListNames