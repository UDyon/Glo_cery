import React from "react";
import styled from "styled-components";

const SvgWrapper2=styled.div`
    width: 300px;
    height: 550px;
`
export default function SvgWrapper({ children, zoom, onZoom }) {
    // reference to the div element
    const wrapRef = React.useRef(null);
    // where to zoom in
    const [zoomPosition, setZoomPosition] = React.useState(null);
    // drag position and distance
    const [drag, setDrag] = React.useState(null);

    // zoom in on click position
    React.useLayoutEffect(() => {
        if (!zoomPosition || zoom === 1) return;
        wrapRef.current.scrollTo(
            zoomPosition.x * (zoom - 1),
            zoomPosition.y * (zoom - 1)
        );
    }, [zoomPosition, zoom]);

    // reset zoom position on zoom out
    React.useEffect(() => {
        if (zoom > 1) return;
        setZoomPosition(null);
    }, [zoom]);

    const didDrag = React.useMemo(() => {
        if (!drag) return false;
        const { x, y } = drag.totalDistance;
        // distance greater than 1 on both x and y (absolute value)
        return x ** 2 + y ** 2 > 2;
    }, [drag]);

    // on click handler
    React.useEffect(() => {
        const fn = (e) => {
            // zoom in if not zoomed in
            // and stop propagation to the svg
            if (!zoomPosition) {
                setZoomPosition({
                    x: e.clientX,
                    y: e.clientY
                });
                onZoom();
                e.stopPropagation();
                // stop propagation to the svg if dragged
                // and reset drag tracking
            } else if (didDrag) {
                setDrag(null);
                e.stopPropagation();
            }
        };
        const { current: wrap } = wrapRef;
        // we need to set up the click listener this way
        // to handle click propagation on the capture phase
        // (before it reaches the svg)
        wrap.addEventListener("click", fn, true);
        return () => wrap.removeEventListener("click", fn, true);
    }, [zoomPosition, didDrag, onZoom]);

    // start tracking drag
    const onMouseDown = (e) => {
        setDrag({
            x: e.clientX,
            y: e.clientY,
            totalDistance: { x: 0, y: 0 }
        });
    };

    // drag logic
    const onMouseMove = (e) => {
        // only drag when zoomed in and after drag initiated
        if (!zoomPosition || !drag) return;
        // if not holding click button, stop drag
        if (e.buttons === 0) {
            setDrag(null);
            return;
        }
        // calculate movement
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        // move
        wrapRef.current.scrollBy(-dx, -dy);
        // calculate distance
        const totalDistance = { ...drag.totalDistance };
        totalDistance.x += Math.abs(dx);
        totalDistance.y += Math.abs(dy);
        // store new drag position and distance
        setDrag({
            x: e.clientX,
            y: e.clientY,
            totalDistance
        });
    };

    return (
        <SvgWrapper2
            ref={wrapRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
        >
            {children}
        </SvgWrapper2>
    );
}
