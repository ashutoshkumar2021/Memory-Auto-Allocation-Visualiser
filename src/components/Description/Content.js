import React,{useState} from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import "./content.css"

function Content() {
    const[modal,setmodal]=useState(false)
  return (
    <div>
        <Modal size='lg' isOpen={modal} toggle={()=>setmodal(!modal)}>
           <ModalHeader className="modalheader" toggle={()=>setmodal(!modal)}>
              Description and working of Algorithm
           </ModalHeader>
           <ModalBody className="Modalbody">
           <div className="input-options-description">
      <h2>Input and Options</h2>
      <p>The Memory Allocation Visualization tool allows users to input their memory allocation requests and choose various options to visualize different allocation algorithms. Users can input the memory size they want to allocate.</p>
      <p>When the user submits a memory allocation request, the visualization tool will allocate the memory block using the selected algorithm and fit type. The allocated memory block will be shown in the visualization and the remaining available memory will be updated accordingly. The user can then submit more memory allocation requests to visualize how the memory allocation algorithm works.</p>
      <p>The visualization tool also shows the number of memory blocks allocated, the number of memory blocks that were not allocated due to insufficient available memory, and the total amount of memory allocated.</p>
      <p>To use the Memory Allocation Visualization tool, simply enter the desired memory size,and click the "Allocate" button. You can then enter more memory allocation requests to see how the allocation algorithm works.</p>
    </div>
    <br></br>
           <ul>
           <li className="color-grey"><span className="color-grey">
            </span> Grey Color- Represents the ending of the entire memory block.
           </li>
           <br></br>
           <li className="color-white"><span className="color-grey">
            </span> White Color- Represents the entire memory block that is available for allocation.
           </li>
           <br></br>
           <li className="color-green"><span className="color-green"></span> Green Color- Represents the memory block that has been allocated to a process.</li>
           <br></br>
           <li className="color-blue"><span className="color-blue"></span> Represents the memory block that is currently being allocated to a process.</li>
           <br></br>
          </ul>
          <div className="input-options-description">
      <h2>First Fit Algorithm</h2>
      <p>The First Fit Algorithm is a memory allocation algorithm that searches for the first available memory block that is large enough to accommodate a process request. It starts at the beginning of the memory block list and scans through the list until it finds a suitable memory block.</p>
      <p>The First Fit Algorithm is a simple and efficient memory allocation strategy that can quickly allocate memory to a process. However, it may not always find the best fit for a process, which can lead to fragmentation and wasted memory.</p>
      <p>To implement the First Fit Algorithm in our visualization, we start with a single memory block representing the entire available memory. When a process is added to the visualization, we search the memory block list sequentially from the beginning until a memory block of sufficient size is found. If the memory block is larger than the process size, we allocate the process to the memory block and split the memory block into two parts. If the memory block is exactly the same size as the process, we allocate the process to the memory block and remove the memory block from the memory block list.</p>
          </div>
          <br></br>
          <div className="input-options-description">
      <h2>Best Fit Algorithm</h2>
      <p>The Best Fit Algorithm is a memory allocation algorithm that searches for the smallest available memory block that is large enough to accommodate a process request. It scans through the entire memory block list and chooses the memory block with the smallest size that is still large enough to hold the process.</p>
      <p>The Best Fit Algorithm can help minimize fragmentation and wasted memory, but it may not always be the most efficient algorithm since it needs to scan through the entire memory block list to find the best fit. This can lead to longer search times and slower allocation speeds.</p>
      <p>To implement the Best Fit Algorithm in our visualization, we start with a single memory block representing the entire available memory. When a process is added to the visualization, we search the memory block list to find the smallest memory block that is still large enough to hold the process. If the memory block is larger than the process size, we allocate the process to the memory block and split the memory block into two parts. If the memory block is exactly the same size as the process, we allocate the process to the memory block and remove the memory block from the memory block list.</p>
         </div>
         <br></br>
         <div className="input-options-description">
      <h2>Worst Fit Algorithm</h2>
      <p>The Worst Fit Algorithm is a memory allocation algorithm that searches for the largest available memory block that is large enough to accommodate a process request. It scans through the entire memory block list and chooses the memory block with the largest size that is still large enough to hold the process.</p>
      <p>The Worst Fit Algorithm can lead to more fragmentation and wasted memory compared to other algorithms since it allocates processes to the largest available memory block, which may not be the most efficient use of memory. However, it can be useful in situations where the largest available memory block is expected to remain unused for a long period of time.</p>
      <p>To implement the Worst Fit Algorithm in our visualization, we start with a single memory block representing the entire available memory. When a process is added to the visualization, we search the memory block list to find the largest memory block that is still large enough to hold the process. If the memory block is larger than the process size, we allocate the process to the memory block and split the memory block into two parts. If the memory block is exactly the same size as the process, we allocate the process to the memory block and remove the memory block from the memory block list.</p>
    </div>
    <br></br>
    <div className="input-options-description">
      <h2>Next Fit Algorithm</h2>
      <p>The Next Fit Algorithm is a memory allocation algorithm that searches for the next available memory block that is large enough to accommodate a process request. It starts searching for an available memory block from the last allocated memory block and continues searching until the end of the memory block list is reached. If there are no available memory blocks from the last allocated memory block to the end of the memory block list, it starts searching from the beginning of the memory block list until it reaches the last allocated memory block.</p>
      <p>The Next Fit Algorithm can reduce fragmentation compared to the First Fit Algorithm since it tends to allocate memory blocks closer together. However, it can still result in fragmentation and wasted memory if memory blocks are not efficiently allocated. It can also be less efficient than the Best Fit Algorithm since it may not always choose the smallest available memory block that can accommodate a process.</p>
      <p>To implement the Next Fit Algorithm in our visualization, we start with a single memory block representing the entire available memory. When a process is added to the visualization, we search the memory block list starting from the last allocated memory block to find the next available memory block that is large enough to hold the process. If the memory block is larger than the process size, we allocate the process to the memory block and update the last allocated memory block to the current memory block.</p>
    </div>
           </ModalBody>
        </Modal>
      <button  className='btn-mt-3' style={{backgroundColor: "#0b3629",color: "white",alignItems:"center"}} onClick={()=>setmodal(true)}> Description and Algorithm</button>

    </div>
  )
}

export default Content
