'use client'

import { usePathname } from 'next/navigation'
import React, { Fragment } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = () => {
    const path = usePathname();
    const segments = path.split('/').filter(Boolean); // Filter out empty segments

    return (
        <div dir='rtl' className='font-alex text-white hidden md:block'>
            <Breadcrumb>
                <BreadcrumbList>
                    {/* Home breadcrumb */}
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
                    </BreadcrumbItem>

                    {/* Render other breadcrumbs */}
                    {segments.map((segment, index) => {
                        const href = `/${segments.slice(0, index + 1).join('/')}`;
                        const formattedSegment = segment.replace(/-/g, ' ').toUpperCase(); // Format segment

                        return (
                            <Fragment key={href}>
                                <BreadcrumbSeparator className='rotate-180' />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={href}>{formattedSegment}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs;
