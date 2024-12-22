
import { AppSidebar } from "@/app/components/dashboard/Sidebar";



const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
            <div className="h-full relative">
                <div className="h-full md:flex md:flex-col md:fixed md:inset-y-0 bg-red-600 md:w-52">
                    <AppSidebar />
                </div>
                <main className="md:pl-52 h-full">
    
                    <div className="h-full">
                        {children}
                    </div>
                </main>
            </div>
    );
}

export default DashboardLayout;