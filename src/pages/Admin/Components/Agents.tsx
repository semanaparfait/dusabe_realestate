import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Users } from "lucide-react";
import { type Agent } from "@/data";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AgentsTabProps {
  agents: Agent[];
  onOpenNewAgent: () => void;
  onOpenEditAgent: (agent: Agent) => void;
  onDeleteAgent: (id: string, name: string) => void;
}

const newAdvisorBtnClass =
  "relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-gold)_0%,var(--accent-gold-dark)_100%)] text-black font-heading font-semibold border-none rounded-lg cursor-pointer shadow-[var(--glow-shadow)] [transition:transform_var(--transition-fast),box-shadow_var(--transition-fast),filter_var(--transition-fast)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 after:content-[''] after:absolute after:top-0 after:-left-3/4 after:w-1/2 after:h-full after:[background:linear-gradient(to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.3)_100%)] after:[transform:skewX(-25deg)] after:[transition:0.75s] hover:after:[animation:shine_0.85s] flex items-center gap-2 px-6 py-3 text-[0.85rem]";

export const AgentsTab: React.FC<AgentsTabProps> = ({
  agents,
  onOpenNewAgent,
  onOpenEditAgent,
  onDeleteAgent,
}) => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Users"));
        setUsers(
          snapshot.docs.map((userDocument) => {
            const data = userDocument.data();
            const createdAt = data.createdAt?.toDate?.() ?? data.createdAt;

            return {
              id: userDocument.id,
              name: data.name || data.displayName || "Unnamed user",
              email: data.email || "No email provided",
              role: data.role || "Client",
              createdAt: createdAt
                ? new Date(createdAt).toLocaleDateString()
                : "Date unavailable",
            };
          }),
        );
      } catch (error) {
        console.error("Unable to fetch users from Firestore.", error);
        setUsersError(
          "Unable to load registered users. Check your database permissions.",
        );
      } finally {
        setUsersLoading(false);
      }
    };

    void fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[1.8rem] font-heading font-bold">
            Advising Group & Consultants
          </h1>
          <p className="text-[0.85rem] text-text-tertiary mt-1">
            Manage private wealth consultants, experience tags, and contact
            protocols.
          </p>
        </div>

        <button onClick={onOpenNewAgent} className={newAdvisorBtnClass}>
          <Plus size={16} /> Register New Advisor
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 hidden">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-2xl border border-border-light bg-bg-secondary p-6 flex flex-col gap-4 [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)] shadow-[var(--glass-shadow)]"
          >
            <div className="flex gap-4 items-center">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent-gold"
              />
              <div>
                <h3 className="text-[1.1rem] font-bold">{agent.name}</h3>
                <div className="text-[0.75rem] text-accent-gold font-semibold">
                  {agent.role}
                </div>
                <div className="text-[0.75rem] text-text-tertiary mt-0.5">
                  {agent.experience} Experience • Rating{" "}
                  {agent.rating.toFixed(1)} ★
                </div>
              </div>
            </div>

            <p className="text-[0.8rem] text-text-secondary leading-[1.4]">
              {agent.bio}
            </p>

            <div className="text-[0.75rem] text-text-tertiary border-t border-border-light pt-3 flex flex-col gap-1">
              <div>Email: {agent.email}</div>
              <div>WhatsApp: {agent.whatsapp}</div>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => onOpenEditAgent(agent)}
                className="flex-1 p-2 rounded-lg bg-bg-tertiary border border-border-light text-text-primary text-[0.8rem] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Edit3 size={14} /> Edit Details
              </button>
              <button
                onClick={() => onDeleteAgent(agent.id, agent.name)}
                className="py-2 px-3 rounded-lg bg-red-500/15 border-none text-red-500 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-border-light bg-bg-secondary p-6 shadow-[var(--glass-shadow)]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-[1.25rem] font-bold">
              <Users size={19} className="text-accent-gold" /> Registered Users
            </h2>
            <p className="mt-1 text-[0.8rem] text-text-tertiary">
              Clients and property seekers registered on the platform.
            </p>
          </div>
          <span className="rounded-full bg-accent-gold/15 px-3 py-1 text-[0.75rem] font-semibold text-accent-gold">
            {users.length} users
          </span>
        </div>

        {usersLoading && (
          <p className="text-[0.85rem] text-text-tertiary">
            Loading registered users...
          </p>
        )}
        {usersError && (
          <p className="text-[0.85rem] text-red-400">{usersError}</p>
        )}
        {!usersLoading && !usersError && users.length === 0 && (
          <p className="text-[0.85rem] text-text-tertiary">
            No registered users found in the users collection.
          </p>
        )}
        {!usersLoading && !usersError && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-[0.82rem]">
              <thead>
                <tr className="border-b border-border-light text-text-tertiary">
                  <th className="px-3 py-3 font-semibold">Name</th>
                  <th className="px-3 py-3 font-semibold">Email</th>
                  <th className="px-3 py-3 font-semibold">Role</th>
                  <th className="px-3 py-3 font-semibold">Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border-light last:border-0"
                  >
                    <td className="px-3 py-3 font-semibold text-text-primary">
                      {user.name}
                    </td>
                    <td className="px-3 py-3 text-text-secondary">
                      {user.email}
                    </td>
                    <td className="px-3 py-3 text-text-secondary">
                      {user.role}
                    </td>
                    <td className="px-3 py-3 text-text-tertiary">
                      {user.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
