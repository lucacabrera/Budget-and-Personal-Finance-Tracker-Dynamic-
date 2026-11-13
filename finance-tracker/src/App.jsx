import "./App.css";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  ChartNoAxesColumn,
  Settings,
} from "lucide-react";
import { useState } from "react";

const pages = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Budgets", icon: Wallet },
  { name: "Analytics", icon: ChartNoAxesColumn },
  { name: "Settings", icon: Settings },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Tesco",
      amount: 33.9,
      category: "Groceries",
      type: "Expense",
    },
    {
      id: 2,
      description: "Salary",
      amount: 120.0,
      category: "Work",
      type: "Income",
    },
  ]);

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <MainContent
        activePage={activePage}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

function Sidebar({ activePage, setActivePage }) {
  function sidebarClick(item) {
    setActivePage(item);
  }

  return (
    <div className="sidebar-container">
      <h1>My Finance Tracker</h1>

      <ul>
        {pages.map((page) => {
          const Icon = page.icon;

          return (
            <li
              key={page.name}
              className={
                activePage === page.name
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => sidebarClick(page.name)}
            >
              <Icon size={20} />
              <span>{page.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MainContent({ activePage, transactions, setTransactions }) {
  return (
    <div className="main-content-container">
      <h2>{activePage}</h2>

      {activePage === "Dashboard" && (
        <div className="card-container">
          <Card title="Balance" content="£5000" />
          <Card title="Income" content="£3000" />
          <Card title="Expenses" content="£2000" />
        </div>
      )}

      {activePage === "Transactions" && (
        <div className="transactions-container">
          {transactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-info">
                <div className="transaction-title">
                  {transaction.description}
                </div>
                <div className="sub-details">
                  <p>{transaction.category}</p>
                  <span> · </span>
                  <p>{transaction.type}</p>
                </div>
              </div>
              <div
                className={
                  transaction.type === "Income"
                    ? "transaction-amount income"
                    : "transaction-amount expense"
                }
              >
                {transaction.type === "Income"
                  ? "+ £" + transaction.amount.toFixed(2)
                  : "- £" + transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
          <AddTransactionForm setTransactions={setTransactions} />
        </div>
      )}
    </div>
  );
}

function AddTransactionForm({ setTransactions }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Income");

  function handleSubmit(event) {
    event.preventDefault();
    const newTransaction = {
      id: crypto.randomUUID(),
      description: title,
      amount: parseFloat(amount),
      category: category,
      type: type,
    };
    setTransactions((previousTransactions) => [
      ...previousTransactions,
      newTransaction,
    ]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <select value={type} onChange={(event) => setType(event.target.value)}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

function Card({ title, content }) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default App;
