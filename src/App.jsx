import { useEffect, useState } from 'react';
import './App.css';
import Popup from './components/Popup';
import TableauEmbed from './components/TableauEmbed';
import { Avatar, Badge } from 'antd';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { DndContext } from '@dnd-kit/core';

import Todo from './components/Todo';
import { Draggable } from './components/global/Draggable';
import { Droppable } from './components/global/Droppable';

function App() {
  const url = 'https://public.tableau.com/app/profile/chris.gerrard/viz/RegionalSampleWorkbook/Storms';
  const options = {
    height: '600px',
    width: '800px',
    hideTabs: true,
    hideToolbar: true,
  };
  return (
    <div className="app" style={{ marginTop: '20px' }}>
      <Todo />
      {/* <TableauEmbed url={url} options={options} /> */}
    </div>
  );
}

export default App;
