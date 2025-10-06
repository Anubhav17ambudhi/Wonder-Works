import ComplaintCard from "../components/ComplaintCard";

function Complaints() {
  // Dummy data (later from backend API)
  const complaints = [
    { id: 1, title: "Water Leakage", description: "Pipe burst near park", status: "OPEN", priority: "HIGH" },
    { id: 2, title: "Street Light Issue", description: "Bulb not working", status: "IN_PROGRESS", priority: "LOW" }
  ];

  return (
    <div>
      <h2>All Complaints</h2>
      {complaints.map(c => <ComplaintCard key={c.id} complaint={c} />)}
    </div>
  );
}

export default Complaints;
