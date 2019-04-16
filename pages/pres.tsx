import dynamic from "next/dynamic";

export default dynamic(() => import("../pres"), { ssr: false });
