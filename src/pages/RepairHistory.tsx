import PortalLayout from "@/components/PortalLayout";
import { History as HistoryIcon } from "lucide-react";

const RepairHistory = () => {
  return (
    <PortalLayout>
      <div className="max-w-2xl">
        <h1 className="font-display font-bold text-2xl text-foreground mb-6">Repair History</h1>
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">No past repairs</p>
          <p className="text-sm text-muted-foreground">
            Your completed repairs will appear here.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
};

export default RepairHistory;
