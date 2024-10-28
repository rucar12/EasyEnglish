import styles from './Header.module.scss'
import {FC} from "react";
import Image from "next/image";
import Header_Logo from '@/../public/easy-eng.jpeg'
import NavLink from "@/components/navLink/NavLink";
import Link from "next/link";

const Header:FC = () => {

    return <div className={styles.header}>
        <Link href={'/'}>
            <Image src={Header_Logo} alt={'Easy English'} width={80} height={80} />
        </Link>
        <nav className={styles.navigation}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/videos'} hasChildRoutes>Videos</NavLink>
            <NavLink href={'/profile'}>Profile</NavLink>
        </nav>
    </div>
}

export default Header