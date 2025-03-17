export const tableHeaders = [
    { field: 'licenseNo', label: 'License Number' },
    { field: 'name', label: 'Name' },
    { field: 'phone', label: 'Phone No' },
    { field: 'tradeName', label: 'Trade Name' },
    { field: 'tradeType', label: 'Trade Type' },
    { field: 'balance', label: 'Balance Fee' },
    { field: 'status', label: 'Status' },
    { field: 'action', label: 'Action' }
  ];

export const tableData = [
    {
      licenseNo: 'VRP-TL-6739-2016-17',
      name: 'ಅಬ್ದುಲ್ ಲತೀಫ್',
      phone: '9448448781',
      tradeName: 'ಹೋಟೆಲ್ ಗಾರ್ಡನ್',
      tradeType: 'ಹೋಟೆಲ್ (ಶ್ರೇಣಿ -1)',
      balance: '₹2,500',
      status: 'Issued',
      action: <button className="viewButton">View Details</button>
    },
    {
      licenseNo: 'TL-2024-002',
      name: 'Jane Smith',
      phone: '9876543211',
      tradeName: 'Smith Trading Co',
      tradeType: 'Wholesale',
      balance: '₹5,000',
      status: 'Pending',
      action: <button className="viewButton">View Details</button>
    },
    {
      licenseNo: 'TL-2024-003',
      name: 'Robert Johnson',
      phone: '9876543212',
      tradeName: 'Johnson Foods',
      tradeType: 'Restaurant',
      balance: '₹0',
      status: 'Expired',
      action: <button className="viewButton">View Details</button>
    },
    {
      licenseNo: 'TL-2024-004',
      name: 'Mary Williams',
      phone: '9876543213',
      tradeName: 'City Textiles',
      tradeType: 'Retail',
      balance: '₹1,200',
      status: 'Active',
      action: <button className="viewButton">View Details</button>
    },
    {
      licenseNo: 'TL-2024-005',
      name: 'David Brown',
      phone: '9876543214',
      tradeName: 'Brown Electronics',
      tradeType: 'Service',
      balance: '₹3,500',
      status: 'Due',
      action: <button className="viewButton">View Details</button>
    }
  ];
