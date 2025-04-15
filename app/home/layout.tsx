import Header from "@/components/Header";
import HeaderMobile from "@/components/header-mobile";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await currentUser();

    if (!user) {
        redirect('/'); // if no user, redirect to "/"
    }

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