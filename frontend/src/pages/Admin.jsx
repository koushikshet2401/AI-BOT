import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

const Admin = () => {
  const [groupedData, setGroupedData] = useState({});
  const [openKey, setOpenKey] = useState(null);

  const groupByDate = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const dateObj = new Date(item.createdAt);

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let dateLabel = dateObj.toLocaleDateString();

      if (dateObj.toDateString() === today.toDateString()) {
        dateLabel = "Today";
      } else if (dateObj.toDateString() === yesterday.toDateString()) {
        dateLabel = "Yesterday";
      }

      if (!grouped[dateLabel]) grouped[dateLabel] = {};
      if (!grouped[dateLabel][item.email]) grouped[dateLabel][item.email] = [];

      grouped[dateLabel][item.email].push(item);
    });

    return grouped;
  };

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("http://localhost:5000/enquiry", {
        credentials: "include",
      });

      const data = await res.json();
      setGroupedData(groupByDate(data.enquiries || []));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const sortedDates = Object.keys(groupedData).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;
    return new Date(b) - new Date(a);
  });

  return (
    <div className={styles.container}>
      <h1>Enquiry Dashboard</h1>

      {sortedDates.map((date) => (
        <div key={date} className={styles.dateBlock}>
          <h2>{date}</h2>

          {Object.keys(groupedData[date]).map((email) => {
            const enquiries = groupedData[date][email];
            const firstItem = enquiries[0];
            const uniqueKey = date + email;

            return (
              <div key={email} style={{ marginBottom: "15px" }}>
                
                {/* 🔹 TOP ROW */}
                <div
                  className={styles.summary}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{firstItem.name}</strong>
                    <p>{email}</p>
                  </div>

                  <button
                    style={{
                      background: "#00ffff",
                      color: "#000",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={() =>
                      setOpenKey(openKey === uniqueKey ? null : uniqueKey)
                    }
                  >
                    Check Queries ({enquiries.length})
                  </button>
                </div>

                {/* 🔹 QUERY BOX BELOW (FULL WIDTH) */}
                {openKey === uniqueKey && (
                  <div
                    className={styles.queryBox}
                    style={{
                      marginTop: "10px",
                      padding: "15px",
                      background: "#00000055",
                      borderRadius: "8px",
                    }}
                  >
                    {enquiries.map((item) => (
                      <p key={item._id}>• {item.query}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Admin;
