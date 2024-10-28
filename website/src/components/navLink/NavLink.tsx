'use client'

import styles from './NavLink.module.scss'
import {usePathname} from "next/navigation";
import Link from "next/link";
import {FC} from "react";

interface NavLinkProps {
    href: string,
    hasChildRoutes?: boolean
}

const NavLink:FC<NavLinkProps> = ({href, children, hasChildRoutes}) => {
  const path = usePathname()
    const checkedPath = hasChildRoutes ? path.startsWith(href) : path === href
    const classNames = checkedPath ? `${styles.link} ${styles.active}` : styles.link

    return <Link href={href} className={classNames}>{children}</Link>
}

export default NavLink