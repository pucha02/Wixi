import React from 'react';
import './HotStripDiscount.css';

const HotStripDiscount = ({content}) => {
  return (
   <>
    <div class="items-wrap">
    <div class="items marquee">
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    </div>
    <div aria-hidden="true" class="items marquee">
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    <div class="item">{content}</div>
    </div>
  </div>
  
  </>
  );
};

export default HotStripDiscount;
