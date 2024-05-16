import React from 'react';
import './accesslog.css';

const Accesslog = () => {
  const data = [
    { id: 162, name: 'Med Ali', Time: '14:30 17/04/2023' },
    { id: 526, name: 'Anis', Time: '8:45 15/04/2023' },
    { id: 120, name: 'Elyes', Time: '16:00 19/04/2023' },
    { id: 200, name: 'Tarek', Time: '11:50 15/04/2023' },
    { id: 126, name: 'Amine', Time: '9:45 20/04/2023' },
    { id: 162, name: 'Med Ali', Time: '14:30 21/04/2023' },
    { id: 526, name: 'Anis', Time: '8:45 22/04/2023' },
    { id: 120, name: 'Elyes', Time: '16:00 22/04/2023' },
    { id: 200, name: 'Tarek', Time: '11:50 26/04/2023' },
    { id: 126, name: 'Amine', Time: '9:45 26/04/2023' },
    // Add more data rows as needed
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
            {/* Add more columns based on your table structure */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.Time}</td>
              {/* Add more cells based on your table structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accesslog;
