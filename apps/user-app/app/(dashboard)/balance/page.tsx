import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default  async function(){
    const balance = await getBalance();
    return (
        <div className="w-full">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
    Balance
   </div>
   <div className="w-full  flex justify-center">
   <BalanceCard amount={balance.amount} locked={balance.locked} />
</div>
</div>
    )
}