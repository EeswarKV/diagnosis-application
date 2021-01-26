import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../../components/testreport/testreport.css';

export default function History() { 
    const [testsHistory, setTestsHistory] = useState([]);
    useEffect(() => {
        setTestsHistory(JSON.parse(localStorage.getItem("users")));
    },[]);
    const TableHeaders = ["Test Name", "Description", "Time", "Result"]
    return (
        <div><p class="reportHeader">View history of tests </p>
         <Table>
            <Thead>
                <Tr>
                    {TableHeaders.map(header => {
                        return (
                            <Th>{header}</Th>
                        );
                    })}
                 </Tr>
            </Thead>
            <Tbody>
                {testsHistory && testsHistory.map(row =>{ 
                    return (<Tr>
                        <Td>{row.name}</Td>
                        <Td></Td>
                        <Td>{row.date}</Td>
                        <Td>{row.result}</Td>
                    </Tr>)
                })}
        </Tbody>
    </Table>   
 </div>
    )
}