---
title: "Data types summary"
slug: "data-types-summary"
date: "2016-05-15T20:22:33-08:00"
product: "KeyValueAPI"
version: "v0.5.8"
type: "key-value-api-v0.5.8"
docurl: "/docs/key-value-api/v0.5.8/"
weight: 125
docsection: "Data types"
draft: false

---

All Key/Value API data types can be thought of as either unordered collections or ordered sequences of items. Collections and sequences can then be further classified as either unique or non-unique.

The table below shows each data type, its ordering and uniqueness guarantees, and the best use cases for the type.

<table class="table table-condensed table-bordered">
    <tr class="active">
        <th></th>
        <th>Ordered</th>
        <th>Unique</th>
        <th>Best for</th>
    </tr>
    <tr>
        <td><strong>String</strong></td>
        <td>Indexed</td> 
        <td>No</td> 
        <td>
            <ul>
                <li>Cache (text, JSON, binary)</li>
                <li>Counting</li>
            </ul>
        </td> 
    </tr> 
    <tr>
        <td><strong>List</strong></td>
        <td>Insertion</td> 
        <td>No</td> 
        <td>
            <ul>
                <li>Fast head/tail operations</li>
                <li>Recent items</li>
            </ul>
        </td> 
    </tr>
    <tr>
        <td><strong>Set</strong></td>
        <td>No</td> 
        <td>Yes</td> 
        <td>
            <ul>
                <li>Existence / membership</li>
                <li>Set operations</li>
            </ul>
        </td> 
    </tr>
    <tr>
         <td><strong>Sorted Set</strong></td>
         <td>Score</td> 
         <td>Yes</td> 
         <td>
             <ul>
                 <li>Top x items</li>
                 <li>Set operations</li>
             </ul>
         </td> 
     </tr>
     <tr>
         <td><strong>Hash</strong></td>
         <td>No</td> 
         <td>Yes</td> 
         <td>
             <ul>
                 <li>Cache</li>
                 <li>Database row / document</li>
             </ul>
         </td> 
     </tr>
</table>

> Best uses above only show use cases for individual types and do not include composite solutions.
