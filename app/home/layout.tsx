import Header from "@/components/Header";
import HeaderMobile from "@/components/header-mobile";
import Sidebar from "@/components/Sidebar";
import { cn } from '../../lib/utils';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className={`grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2 h-screen`}>
                <Header />
                <Sidebar />
                <div className={`bg-black rounded-3xl col-span-full md:col-auto`}>
                    {children}
                </div>
                <HeaderMobile />
            </div>
        </>
    )
}