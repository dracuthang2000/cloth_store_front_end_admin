import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Tab, Tabs, Typography } from "@mui/material";
import './Order.css';
import Axios from '../../../Axios';
import TableOrder from './TableOrder';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Order() {
    const [value, setValue] = useState(sessionStorage.getItem('valueTabOrder') ? parseInt(sessionStorage.getItem('valueTabOrder')!) : 0);
    const bill = {
        id: '',
        date: '',
        note: '',
        total: 0,
        state: '',
        receiver: {
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            mail: ''
        },
        bill_product_details: [
            {
                id: '',
                quantity: 0,
                version: 0,
                unit_price: 1000,
                product_color_size: {
                    id: '',
                    size: {
                        size: '',
                    },
                    color: {
                        color: {
                            color: '',
                        },
                        product: {
                            id: '',
                            description: '',
                            product_name: '',
                            stuff: '',
                            label: '',
                            gender: '',
                            brand: '',
                        },
                        img: ''
                    }
                }
            },
        ],
        id_customer: ''
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        sessionStorage.setItem('valueTabOrder', newValue.toString());
    };

    return (
        <div className='container-delivery'>
            <div className='container-delivery-status'>
                <div className='tablist'>
                    <Tabs className='tabs-delivery' sx={{ width: '100%' }} value={value} onChange={handleChange} centered>
                        <Tab sx={{ width: '20%' }} label="All" />
                        <Tab sx={{ width: '20%' }} label="Processing" />
                        <Tab sx={{ width: '20%' }} label="Delivering" />
                        <Tab sx={{ width: '20%' }} label="Finishing" />
                        <Tab sx={{ width: '20%' }} label="Canceling" />
                    </Tabs>
                </div>
                <div className='tab-details'>
                    <TabPanel value={value} index={0}>
                        <TableOrder state={"ALL"} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TableOrder state={"PRO"} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TableOrder state={"DEL"} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TableOrder state={"FIN"} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <TableOrder state={"CAN"} />
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
