import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./InvoiceStudent.module.css";
import usePageTitle from "../../../services/Oprations/Title/Title";
import { formatINR } from "../../../services/Oprations/formatCurrency";
import { getAllInvoices } from "../../../services/Oprations/Payamnets";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";

function InvoiceStudent() {

const invoices = useSelector(
(state) => state.course?.allInvoices || []
)

const dispatch = useDispatch();
const [previewInvoice,setPreviewInvoice] = useState(null);

useEffect(()=>{
getAllInvoices(dispatch);
},[dispatch]);

usePageTitle("Invoices");

const totalSpent = useMemo(()=>{
return invoices.reduce((acc,item)=>acc+(item.finalAmount||0),0);
},[invoices]);

/* ---------------- PDF DOWNLOAD ---------------- */

const downloadPDF = (invoice)=>{

const doc = new jsPDF();

const purchaseDate = new Date(invoice.purchasedAt).toLocaleDateString();

const total = invoice.finalAmount;
const gstRate = 18;

const basePrice = (total/(1+gstRate/100)).toFixed(2);
const gstAmount = (total-basePrice).toFixed(2);

doc.setFillColor(124,58,237);
doc.rect(0,0,210,30,"F");

doc.setTextColor(255,255,255);
doc.setFontSize(20);
doc.text("StudyNotion",20,18);

doc.setFontSize(12);
doc.text("TAX INVOICE",165,18);

doc.setTextColor(0,0,0);

doc.setFontSize(12);

doc.text(`Invoice Number : ${invoice.invoiceNumber}`,20,50);
doc.text(`Date : ${purchaseDate}`,20,60);
doc.text(`Payment Method : ${invoice.paymentMethod}`,20,70);

doc.setFontSize(14);
doc.text("Bill To",20,90);

doc.setFontSize(12);
doc.text(invoice.studentName,20,100);
doc.text(invoice.email,20,108);
doc.text(invoice.phone,20,116);

doc.setFillColor(230,230,230);
doc.rect(20,130,170,10,"F");

doc.text("Course",22,137);
doc.text("Price",170,137,{align:"right"});

doc.rect(20,140,170,12);
doc.text(invoice.courseName,22,148);
doc.text(`₹${basePrice}`,170,148,{align:"right"});

doc.text("GST (18%)",22,165);
doc.text(`₹${gstAmount}`,170,165,{align:"right"});

doc.setFontSize(13);
doc.text("Total Paid",22,180);
doc.text(`₹${total}`,170,180,{align:"right"});

doc.setFontSize(14);
doc.text("Payment Details",20,205);

doc.setFontSize(11);
doc.text(`Razorpay Order ID : ${invoice.razorpay_order_id}`,20,215);
doc.text(`Razorpay Payment ID : ${invoice.razorpay_payment_id}`,20,223);

doc.setFontSize(10);
doc.setTextColor(120);
doc.text(
"This is a system generated invoice. No signature required.",
105,
280,
{align:"center"}
);

doc.save(`${invoice.invoiceNumber}.pdf`);
};

/* ---------------- EXPORT ALL ---------------- */

const exportAllInvoices = ()=>{
invoices.forEach(downloadPDF);
};

return(

<div className={styles.container}>

<h1 className={styles.title}>Invoices</h1>

 

<button
className={styles.exportBtn}
onClick={exportAllInvoices}
>
Export All Invoices
</button>

{/* ANALYTICS */}

<div className={styles.analyticsGrid}>

<motion.div
className={styles.analyticsCard}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
>
<p>Total Spent</p>
<h2>₹{formatINR(totalSpent)}</h2>
<span>Total amount paid</span>
</motion.div>

<motion.div
className={styles.analyticsCard}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
>
<p>Total Invoices</p>
<h2>{invoices.length}</h2>
<span>Successful purchases</span>
</motion.div>

<motion.div
className={styles.analyticsCard}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
>
<p>Status</p>
<h2>Active</h2>
<span>Courses unlocked</span>
</motion.div>

</div>

{/* INVOICE LIST */}

{invoices.length===0?(
<div className={styles.emptyState}>
<h3>No Invoices Found</h3>
<p>You haven’t purchased any courses yet.</p>
</div>
):(

<div className={styles.invoiceList}>

{invoices.map((invoice)=>(

<motion.div
key={invoice._id}
className={styles.invoiceCard}
whileHover={{scale:1.02}}
initial={{opacity:0,y:15}}
animate={{opacity:1,y:0}}
>

<div className={styles.left}>

<h3>{invoice.courseName}</h3>

<p>
{new Date(invoice.purchasedAt).toLocaleDateString()}
</p>

<span className={styles.invoiceNumber}>
{invoice.invoiceNumber}
</span>

</div>

<div className={styles.right}>

<span className={styles.amount}>
₹{formatINR(invoice.finalAmount)}
</span>

<button
className={styles.previewBtn}
onClick={()=>setPreviewInvoice(invoice)}
>
Preview
</button>

<button
className={styles.downloadBtn}
onClick={()=>downloadPDF(invoice)}
>
Download
</button>

</div>

</motion.div>

))}

</div>
)}

{/* PREVIEW MODAL */}

<AnimatePresence>

{previewInvoice &&(

<motion.div
className={styles.modalOverlay}
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
>

<motion.div
className={styles.modal}
initial={{scale:.8,opacity:0}}
animate={{scale:1,opacity:1}}
exit={{scale:.8,opacity:0}}
>

<h3>Invoice Preview</h3>

<p><b>Course :</b> {previewInvoice.courseName}</p>
<p><b>Amount :</b> ₹{formatINR(previewInvoice.finalAmount)}</p>
<p><b>Invoice :</b> {previewInvoice.invoiceNumber}</p>
<p><b>Date :</b> {new Date(previewInvoice.purchasedAt).toLocaleDateString()}</p>

<div className={styles.modalActions}>

<button
className={styles.downloadBtn}
onClick={()=>{
downloadPDF(previewInvoice)
setPreviewInvoice(null)
}}
>
Download PDF
</button>

<button
className={styles.closeBtn}
onClick={()=>setPreviewInvoice(null)}
>
Close
</button>

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

</div>
);
}

export default InvoiceStudent;