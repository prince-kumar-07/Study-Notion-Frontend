import { useEffect, useState } from "react";
import styles from "./AdminContactManager.module.css";
import { VscShield } from "react-icons/vsc";
import { ChevronDown, ChevronUp, Reply, CheckCircle } from "lucide-react";
import {
  getAllContact,
  updateContactStatus,
  replyContact,
} from "../../../services/Oprations/Contact";
import { useDispatch, useSelector } from "react-redux";

export default function AdminContactManager() {

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact?.allMessage) || [];
  const [expandedId, setExpandedId] = useState(null);
  const [replyModal, setReplyModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [filter, setFilter] = useState("open");

  useEffect(() => {
    getAllContact(dispatch);
  }, []);

  function toggleExpand(id) {
    setExpandedId(expandedId === id ? null : id);
  }

  function handleStatus(contactId, status) {
    updateContactStatus(dispatch, { contactId, status });
  }

  function openReply(contact) {
    setSelectedContact(contact);
    setReplyModal(true);
  }

  function sendReply() {
    if (!replyMessage.trim()) return;

    replyContact(dispatch, {
      contactId: selectedContact._id,
      message: replyMessage,
    });

    setReplyModal(false);
    setReplyMessage("");
  }

  function handleFilterChange(e) {
    const value = e.target.value;
    setFilter(value);
  }

  const filteredContacts =
    filter === "all"
      ? contacts
      : contacts.filter(c => c.status === filter);

  return (
    <div className={styles.wrapper}>

      {/* Header */}
      <div className={styles.header}>

        <div className={styles.headerLeft}>
          <h1>Contact Message Management</h1>

         <div className={styles.securityBadge}>
                   <VscShield />
                   <span>Admin Access Only</span>
                 </div>
        </div>

        <div className={styles.headerRight}>

          <select
            value={filter}
            onChange={handleFilterChange}
            className={styles.select}
          >
            <option  className={styles.optionValue}  value="all">All</option>
            <option  className={styles.optionValue} value="open">Open</option>
            <option  className={styles.optionValue} value="closed">Closed</option>
          </select>

          <input
            className={styles.search}
            placeholder="Search contact"
          />

        </div>

      </div>


      {/* Table */}
      <div className={styles.table}>

        <div className={styles.tableHead}>
          <div>User</div>
          <div>Email</div>
          <div>Status</div>
          <div>Action</div>
        </div>


        {filteredContacts.map(contact => {

          const expanded =
            expandedId === contact._id;

          return (
            <div key={contact._id} className={styles.rowWrapper}>
              <div className={styles.row}>
                <div className={styles.userCell}>
                  <div className={styles.avatar}>{contact.name.charAt(0)}</div>
                  {contact.name}
                </div>

                <div className={styles.email}>{contact.email}</div>

                <div>
                  <span
                    className={
                      contact.status === "open" ? styles.open : styles.closed
                    }
                  >
                    {contact.status}
                  </span>
                </div>

                <div className={styles.actions}>
                  <button
                    onClick={() => toggleExpand(contact._id)}
                    className={styles.iconBtn}
                  >
                    {expanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              {expanded && (
                <div className={styles.expanded}>
                  <div className={styles.message}>{contact.message}</div>

                  {contact.response?.message && (
                    <div className={styles.reply}>
                      Reply: {contact.response.message}
                    </div>
                  )}

                  <div className={styles.expandedActions}>
                    {contact.status === "open" && (
                      <div>
                        <button
                          className={styles.closeBtn}
                          onClick={() => handleStatus(contact._id, "closed")}
                        >
                          <CheckCircle size={16} />
                          Close
                        </button>

                        <button
                          className={styles.replyBtn}
                          onClick={() => openReply(contact)}
                        >
                          <Reply size={16} />
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>


      {/* Modal */}
      {replyModal && (

        <div className={styles.overlay}>

          <div className={styles.modal}>

            <h3>
              Reply to {selectedContact.name}
            </h3>

            <textarea
              value={replyMessage}
              onChange={(e)=>
                setReplyMessage(e.target.value)
              }
              placeholder="Type your reply..."
            />

            <div className={styles.modalActions}>

              <button
                onClick={sendReply}
                className={styles.replyBtn}
              >
                Send Reply
              </button>

              <button
                onClick={()=>setReplyModal(false)}
                className={styles.closeBtn}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}