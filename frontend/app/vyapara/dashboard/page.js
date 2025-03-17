'use client';
import Stats from '@/app/components/Stats';
import DataTable from '@/app/components/DataTable';
import styles from './trade.module.css';
import { statsData } from '@/app/Data/StatsData';
import { tableData, tableHeaders } from '@/app/Data/TableData';

export default function TradeDashboard() {
  const tableTitle = "Applications in Progress"
  
  return (
    <>
      <Stats stats={statsData} />
      <DataTable 
        title={tableTitle}
        headers={tableHeaders}
        data={tableData}
        statusField="status"
      />
    </>
  );
}
