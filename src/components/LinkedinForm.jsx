import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../services/api';

const LinkedInScraperForm = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(API.url, { url }, { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'email_addresses.xlsx';
            document.body.appendChild(a);
            a.click();
            setLoading(false);
        } catch (error) {
            console.error('Error scraping LinkedIn:', error);
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-300">
            <div className="container h-screen mx-auto flex justify-center items-center p-2 md:p-0 w-full">
                <div className='w-full'>
                    <h1 className='text-5xl mb-5 text-center'>Get emails from Linkedin Post</h1>
                    <form onSubmit={handleSubmit} className='text-center w-full'>
                        <input className="w-full rounded-lg p-4 border-2 mr-0 text-gray-800 border-gray-200 bg-white block mb-5" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter Post URL" />
                        <button type="submit" disabled={loading} className="px-8 rounded-lg bg-blue-400  text-gray-800 font-bold p-4 uppercase border-blue-500 border-2"> {loading ? 'Loading...' : 'Scrape'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LinkedInScraperForm;
