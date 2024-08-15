import React from "react";

const ProjectHoursSupport = () => {
    return (
        <div>
            <div className="flex justify-center">
                <div
                    className="grid lg:grid-cols-3 sm:grid-cols-3 xs:grid-cols-1"
                    style={{
                    justifyContent: "center"
                }}>
                    <div className="grids">
                        <div className="grids-title">5,234</div>
                        <div className="grids-subtitle">Projects</div>
                        <div className="grids-content">
                            Of “high-performing” level are led by a certified project manager.</div>
                    </div>

                    <div className="grids">
                        <div className="grids-title">3,400+</div>
                        <div className="grids-subtitle">Hours</div>
                        <div className="grids-content">That meets quality standards required by our users.</div>
                    </div>

                    <div className="grids">
                        <div className="grids-title">24/7</div>
                        <div className="grids-subtitle">Support</div>
                        <div className="grids-content">
                            Actively engage team members that finishes on time.</div>
                    </div>

                </div>
            </div>
            <div className="mt-20 flex justify-center">
                <div className="get-free-qoutation">
                    <p className="mt-1 font-bold text-[24px]">Get Free Quotation</p>
                    <button className="free-qoutation-btn">Free Quotation</button>
                </div>
            </div>
        </div>

    )
}

export default ProjectHoursSupport