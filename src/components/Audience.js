import React, { useState } from 'react';
import axios from 'axios';

const Audience = ({ token }) => {
    const [rules, setRules] = useState([]);
    const [audienceSize, setAudienceSize] = useState(0);

    const addRule = () => setRules([...rules, { field: '', operator: '', value: '' }]);

    const handleRuleChange = (index, key, value) => {
        const newRules = [...rules];
        newRules[index][key] = value;
        setRules(newRules);
    };

    const checkAudienceSize = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/audience`, { rules }, { headers: { Authorization: token } });
            setAudienceSize(res.data.size);
        } catch (err) {
            console.error(err);
        }
    };

    const saveAudience = async () => {
        try {
            await checkAudienceSize();
            // Additional code to save audience and navigate to campaign list
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Create Audience</h1>
            {rules.map((rule, index) => (
                <div key={index}>
                    <select onChange={e => handleRuleChange(index, 'field', e.target.value)}>
                        <option value="">Select Field</option>
                        <option value="total_spends">Total Spends</option>
                        <option value="visits">Visits</option>
                        <option value="last_visit">Last Visit</option>
                    </select>
                    <select onChange={e => handleRuleChange(index, 'operator', e.target.value)}>
                        <option value="">Select Operator</option>
                        <option value=">">Greater Than</option>
                        <option value="<">Less Than</option>
                        <option value="=">Equal To</option>
                    </select>
                    <input type="text" onChange={e => handleRuleChange(index, 'value', e.target.value)} />
                </div>
            ))}
            <button onClick={addRule}>Add Rule</button>
            <button onClick={checkAudienceSize}>Check Audience Size</button>
            <button onClick={saveAudience}>Save Audience</button>
            <p>Audience Size: {audienceSize}</p>
        </div>
    );
};

export default Audience;
