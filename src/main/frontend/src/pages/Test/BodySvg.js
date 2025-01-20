import React, { useState } from "react";

export default function BodySvg({ onPartClick, selected, style }) {
    const [hoveredPart, setHoveredPart] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const makeClickHandler = (name) => () => {
        onPartClick(name);
    };
    const makeMouseEnterHandler = (name) => (event) => {
        setHoveredPart(name);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
    };

    const makeMouseLeaveHandler = () => () => setHoveredPart(null);

    const partNamesInKorean = {
        "head": "머리",
        "neck": "목",
        "upper-abdomen": "윗배/등허리",
        "torso": "아랫배/골반",
        "left-hand": "왼손",
        "left-wrist": "왼쪽 손목/전완(팔뚝)",
        "left-elbow": "왼쪽 팔꿈치/상완",
        "left-shoulder": "왼쪽 어깨",
        "left-chest": "왼쪽 가슴/등",
        "left-thigh": "왼쪽 허벅지",
        "left-knee": "왼쪽 무릎",
        "left-ankle": "왼쪽 종아리/발목",
        "left-foot": "왼발",
        "right-hand": "오른손",
        "right-wrist": "오른쪽 손목/전완(팔뚝)",
        "right-elbow": "오른쪽 팔꿈치/상완",
        "right-shoulder": "오른쪽 어깨",
        "right-chest": "오른쪽 가슴/등",
        "right-thigh": "오른쪽 허벅지",
        "right-knee": "오른쪽 무릎",
        "right-ankle": "오른쪽 종아리/발목",
        "right-foot": "오른발",
    };

    return (
        <div style={{position: 'relative'}}>
            <svg viewBox="0 0 283.746 529.262" style={style}>
                <defs>
                    <clipPath id="a">
                        <path
                            className="a"
                            d="M107.678-308.24a29.135,29.135,0,0,0,8-1.542c4.746-2.384,4.746-2.384,8.02-6.085q3.274-3.7,5.236-11.593a3.789,3.789,0,0,0,2.952-2c.876-1.671,1.817-1.356,2.356-4.077s.679-3.642,0-5.262-1.914-3.985-3.968-3.985,1.3-10.509-3.525-20.505q-4.825-10-19.07-9.7-14.245-.3-19.07,9.7c-4.825,10-1.47,20.505-3.525,20.505s-3.29,2.366-3.968,3.985-.539,2.541,0,5.262,1.48,2.406,2.356,4.077a3.789,3.789,0,0,0,2.952,2q1.962,7.892,5.236,11.593c3.274,3.7,3.274,3.7,8.02,6.085a29.135,29.135,0,0,0,8,1.542"
                            transform="translate(-80.656 373)"
                        />
                    </clipPath>
                    <clipPath id="b">
                        <path
                            className="b"
                            d="M-416,1682.542H1571.971V-493H-416Z"
                            transform="translate(416 493)"
                        />
                    </clipPath>
                    <clipPath id="c">
                        <path
                            className="a"
                            d="M108.782-292.381a42.512,42.512,0,0,0,30.749-15.007q-13.3-.912-16.646-8.352t4.532-18.571l-1.9,3.319-2.629,2.724-3.441,2.432-5.313,1.99-5.35.709-5.35-.709-5.313-1.99-3.441-2.432-2.629-2.724-1.9-3.319q7.88,11.131,4.532,18.571t-16.646,8.352a42.512,42.512,0,0,0,30.749,15.007"
                            transform="translate(-78.033 334.312)"
                        />
                    </clipPath>
                    <clipPath id="e">
                        <path
                            className="a"
                            d="M113.9-149.082a122.793,122.793,0,0,0,28.08-14.794q13.744-9.568,21.771-19.909-.239-14.085-1.728-27.472c-.662-5.95-1.644-12.194-2.948-19.664q-3.022,1.236-25.816,5.125c-8.717,1.447-14.7,2.171-18.894,2.171S103.718-224.35,95-225.8c-15.2-2.593-23.335-4.3-25.35-5.125-1.3,7.47-2.286,13.715-2.948,19.664q-1.489,13.387-1.728,27.472a95.333,95.333,0,0,0,21.305,19.909,122.793,122.793,0,0,0,28.08,14.794"
                            transform="translate(-64.976 230.922)"
                        />
                    </clipPath>
                    <clipPath id="g">
                        <path
                            className="a"
                            d="M113.061-262.508a59.923,59.923,0,0,0,13.843,3.26,104,104,0,0,0,16.989.932,67.633,67.633,0,0,0,14.57-1.4l-4.742,18.794,3.679,22q-5.833,1.251-13.507,2.69c-7.674,1.439-7.716,1.583-15.375,2.727-5.106.762-9.612,1.864-14.909,1.864s-10.69-1.1-15.8-1.864c-7.659-1.143-7.7-1.287-15.375-2.727q-7.674-1.439-13.507-2.69l3.679-22-4.743-18.794a67.633,67.633,0,0,0,14.57,1.4,104,104,0,0,0,16.989-.932,59.923,59.923,0,0,0,13.843-3.26"
                            transform="translate(-67.869 262.508)"
                        />
                    </clipPath>
                    <clipPath id="i">
                        <path
                            className="a"
                            d="M100.385-298.9c13.12-.988,22.81-6.229,30.932-15.725.409-.237,3.842,2.523,6.967,9.122s3.7,8.372,6.053,19.729a165.345,165.345,0,0,1,3.01,24.094c.306,4.1-.2,4.831-.664,9.859s-1.7,12.654-1.7,12.654c.572.484-7.289,1.466-13.667,1.406-8.185-.076-13.911-.138-21.084-1.406-8.806-1.557-9.9-2.79-9.9-2.79Z"
                            transform="translate(-100.328 314.639)"
                        />
                    </clipPath>
                    <clipPath id="k">
                        <path
                            className="a"
                            d="M112.957-298.9c-13.12-.988-22.81-6.229-30.932-15.725-.409-.237-3.842,2.523-6.967,9.122s-3.7,8.372-6.053,19.729A165.36,165.36,0,0,0,66-261.681c-.306,4.1.2,4.831.664,9.859s1.7,12.654,1.7,12.654c-.572.484,7.289,1.466,13.667,1.406,8.185-.076,13.911-.138,21.084-1.406,8.806-1.557,9.9-2.79,9.9-2.79Z"
                            transform="translate(-65.902 314.639)"
                        />
                    </clipPath>
                    <clipPath id="m">
                        <path
                            className="a"
                            d="M124.918-313.328q3.56,1.225,6.812,2.45c3.252,1.225,3.5,1.226,6.491,2.559s2.841.938,5.927,2.984,3.723,2.377,5.992,4.919,2.346,2.824,4.061,6.342a35.955,35.955,0,0,1,2.867,7.869,58.947,58.947,0,0,1,1.517,7.311s-2.451,2.731-8.444,11.224q-5.992,8.493-11.919,8.493-.09-5.131-.466-10.245t-1.074-10.722q-.8-4.97-1.74-9.2a71.312,71.312,0,0,0-2.132-8.279,66.591,66.591,0,0,0-2.789-7.714,16.99,16.99,0,0,0-2.175-4.069A32.421,32.421,0,0,0,124.918-313.328Z"
                            transform="translate(-124.918 313.328)"
                        />
                    </clipPath>
                    <clipPath id="o">
                        <path
                            className="a"
                            d="M155.259-287.505c1.065,4.467-.05,2.257,1.392,6.933s1.067,4.534,2.516,8.605,2.714,6.156,3.965,9.356.433,1.76,2.891,5.829,2.267,3.8,3.42,5.234q1.153,1.434,3.863,4.143.082,9.967-5.663,14.376t-14.031.739l-3.669-5.465-4.06-5.252q-.723-.967-3.049-5.151A70.431,70.431,0,0,1,139-256.1l-2.972-7.289-1.6-4.862q6.831-1.608,9.751-5.136C151.919-282.736,154.709-289.814,155.259-287.505Z"
                            transform="translate(-134.431 287.945)"
                        />
                    </clipPath>
                    <clipPath id="q">
                        <path
                            className="a"
                            d="M168.215-258.9q3.33,5.122,5.46,8.221a64.323,64.323,0,0,1,4.445,7.392c1.894,3.457,2.15,4.254,3.758,7.745a69.175,69.175,0,0,1,3.007,7.832c1.567,4.322,1.868,4.864,2.819,8.132s.948,2.8,2.286,7.621,1.293,4.989,2.217,7.986a72.342,72.342,0,0,0,2.439,6.913,27.547,27.547,0,0,0,1.473,3.409,53.906,53.906,0,0,0,2.722,4.948,6.367,6.367,0,0,0-6.634-3.182q-4.48.447-7.516,6.13l-2.813-6.13L179-197.938l-3.822-7.3-4.444-7.188q-3.408-5.326-6.109-9.085t-5.277-6.946l-3.782-5.081-3.023-4-4.015-5.449q9.251,3.008,14.662-1.82T168.215-258.9Z"
                            transform="translate(-148.525 258.902)"
                        />
                    </clipPath>
                    <clipPath id="s">
                        <path
                            className="a"
                            d="M186.155-209.932a6.787,6.787,0,0,0,3.195,2.925c2.26,1.11,1.932-.864,4.876,1.038a14.593,14.593,0,0,1,4.81,5.22l6.01,6.877,5.107,5.751a1.766,1.766,0,0,1-.9,1.948,3.09,3.09,0,0,1-2.643,0l-2.434-1.948-5.141-4.606,8.771,20.593q-.324,2.692-1.2,3.28t-2.434-.833l-7.5-16.486q-.752-1.038-.752,0a7.552,7.552,0,0,0,.752,2.781l6.309,14.537q.876,3.384,0,4.214t-3.356-1.03l-7.657-17.018q-.6-.778-.6,0a5.547,5.547,0,0,0,.6,2.112l5.483,13.193a3.611,3.611,0,0,1-1.2,3.065q-1.152.808-2.712-.321l-6.75-15.251q-.424-.918-.712-.684t0,1.642l4.423,10.08q.189,2.013-1.153,2.459a1.951,1.951,0,0,1-2.338-.988l-10.489-24.106q-1.786-5.473-1.64-7.948c.146-2.476-.349-1.934,0-4.562s3.253-6,5.288-6.782Q182.205-211.56,186.155-209.932Z"
                            transform="translate(-174.754 211.033)"
                        />
                    </clipPath>
                    <clipPath id="u">
                        <path
                            className="a"
                            d="M24.021-209.932a6.786,6.786,0,0,1-3.195,2.925c-2.26,1.11-1.932-.864-4.876,1.038a14.593,14.593,0,0,0-4.81,5.22l-6.01,6.877L.024-188.12a1.766,1.766,0,0,0,.9,1.948,3.09,3.09,0,0,0,2.643,0L6-188.12l5.141-4.606L2.369-172.134q.324,2.692,1.2,3.28T6-169.686l7.5-16.486q.752-1.038.752,0a7.551,7.551,0,0,1-.752,2.781L7.192-168.854q-.876,3.384,0,4.214t3.356-1.03L18.2-182.687q.6-.778.6,0a5.545,5.545,0,0,1-.6,2.112l-5.483,13.193a3.611,3.611,0,0,0,1.2,3.065q1.152.808,2.712-.321l6.75-15.251q.424-.918.712-.684t0,1.642l-4.423,10.08q-.189,2.013,1.152,2.459a1.951,1.951,0,0,0,2.339-.988l10.489-24.106q1.786-5.473,1.64-7.948c-.146-2.476.349-1.934,0-4.562s-3.253-6-5.288-6.782Q27.971-211.56,24.021-209.932Z"
                            transform="translate(0 211.033)"
                        />
                    </clipPath>
                    <clipPath id="w">
                        <path
                            className="a"
                            d="M84.485-313.328q-3.56,1.225-6.812,2.45c-3.252,1.225-3.5,1.226-6.491,2.559s-2.841.938-5.927,2.984-3.723,2.377-5.992,4.919-2.346,2.824-4.06,6.342a35.957,35.957,0,0,0-2.867,7.869,58.957,58.957,0,0,0-1.517,7.311s2.451,2.731,8.444,11.224q5.992,8.493,11.919,8.493.09-5.131.466-10.245t1.074-10.722q.8-4.97,1.74-9.2a71.32,71.32,0,0,1,2.132-8.279,66.6,66.6,0,0,1,2.789-7.714,16.986,16.986,0,0,1,2.175-4.069A32.421,32.421,0,0,1,84.485-313.328Z"
                            transform="translate(-50.82 313.328)"
                        />
                    </clipPath>
                    <clipPath id="y">
                        <path
                            className="a"
                            d="M55.759-287.505c-1.065,4.467.05,2.257-1.392,6.933s-1.067,4.534-2.516,8.605-2.713,6.156-3.965,9.356-.433,1.76-2.891,5.829-2.267,3.8-3.42,5.234q-1.153,1.434-3.863,4.143-.082,9.967,5.663,14.376t14.031.739l3.669-5.465,4.06-5.252q.723-.967,3.049-5.151a70.416,70.416,0,0,0,3.835-7.945l2.972-7.289,1.6-4.862q-6.831-1.608-9.751-5.136C59.1-282.736,56.309-289.814,55.759-287.505Z"
                            transform="translate(-37.71 287.945)"
                        />
                    </clipPath>
                    <clipPath id="aa">
                        <path
                            className="a"
                            d="M46.036-258.9q-3.33,5.122-5.46,8.221a64.334,64.334,0,0,0-4.445,7.392c-1.894,3.457-2.149,4.254-3.758,7.745a69.215,69.215,0,0,0-3.007,7.832c-1.567,4.322-1.868,4.864-2.819,8.132s-.948,2.8-2.286,7.621-1.293,4.989-2.217,7.986A72.331,72.331,0,0,1,19.6-197.06a27.546,27.546,0,0,1-1.473,3.409A53.885,53.885,0,0,1,15.41-188.7a6.367,6.367,0,0,1,6.634-3.182q4.48.447,7.516,6.13l2.813-6.13,2.881-6.052,3.822-7.3,4.444-7.188q3.408-5.326,6.109-9.085t5.278-6.946l3.782-5.081,3.023-4,4.015-5.449q-9.251,3.008-14.662-1.82T46.036-258.9Z"
                            transform="translate(-15.41 258.902)"
                        />
                    </clipPath>
                    <clipPath id="ac">
                        <path
                            className="a"
                            d="M149.647-196.607q1.475,16.727,2.134,27.782c.659,11.055.632,10.59.85,22.266s.192,13.762,0,23.4-.691,13.467-.85,19.218.3,6.6,0,11.544c-.113,1.846,1.108,14.887.85,16.677-.2,1.405-.5-4.875-3.4-10.156s-2.9-4.857-6.622-8.1q-3.724-3.243-10.739-3.908a15.634,15.634,0,0,0-7.446,3.49,23.957,23.957,0,0,0-5.064,7.249q-2.336,4.613-1.657,18.66l-6.445-36.444Q109.136-117.081,107.19-127c-1.947-9.918-2.421-11.651-4.106-19.594q-1.685-7.943-3.411-15.371a158.815,158.815,0,0,0,27.888-14.742A120.525,120.525,0,0,0,149.647-196.607Z"
                            transform="translate(-99.672 196.607)"
                        />
                    </clipPath>
                    <clipPath id="ae">
                        <path
                            className="a"
                            d="M133.52-80.285c8.869-1.564,14.266-13,12.054-25.543s-11.194-21.444-20.063-19.88-14.266,13-12.054,25.543S124.651-78.721,133.52-80.285Z"
                            transform="translate(-112.961 125.887)"
                        />
                    </clipPath>
                    <clipPath id="ag">
                        <path
                            className="a"
                            d="M148.731-101.046c.064,6.019.115,5.8,0,8.186q-.238,4.946-1.161,19.41l-.84,18.4q-1.358,11.531-2.14,18.721t-1.472,14.488a73.8,73.8,0,0,0-.67,10.054,80.842,80.842,0,0,0,.67,10.366l1.255,5.913q-7.752,4.539-12.53,4.539T122.31,4.492l1.76-17.114q1.051-3.932,0-14.679c-1.051-10.748-1.842-12.995-3.432-20.419s-2.693-7.944-3.813-13.411-2.986-15.533-3.719-23.559q-.734-8.026-.635-19.351,4.45,12,9.2,15.09c4.752,3.093,7.72,4.351,11.717,4.038q4-.313,9.727-5.865a34.079,34.079,0,0,0,3.253-6.285c.788-2.3,1.436-8.339,1.371-13.254C147.716-112.174,148.666-107.065,148.731-101.046Z"
                            transform="translate(-112.459 110.705)"
                        />
                    </clipPath>
                    <clipPath id="ai">
                        <path
                            className="a"
                            d="M142.654-28.738a30.493,30.493,0,0,0,3.386,7.559,46.988,46.988,0,0,0,5.806,7.768,45.909,45.909,0,0,0,4.822,4.972c1.8,1.73,1.637,1.211,3.822,3.314a26.871,26.871,0,0,1,4.147,4.356,11.2,11.2,0,0,1,1.835,4,14.565,14.565,0,0,1,.755,3.3,17.609,17.609,0,0,1-8.577,3.765c-4.964.795-7.688-1.047-10.534-.706s-1.891,1.74-3.96,1.74a5.532,5.532,0,0,1-3.879-1.74q-2.218-2.056-3.233-3.059t-2.737-2.623A12.881,12.881,0,0,1,132.123.75c-.877-1.773-1.326-1.3-2.52-2.868s-1.822-1.594-3.37-2.154a18.432,18.432,0,0,0-3.942-.852q-.943-.559-2.183-1.2c-1.241-.641-1.844-3.016-2.394-5.351s-.337-2.456,0-4.825.634-1.158,1.35-4.676a65.706,65.706,0,0,0,1.044-7.093q2.966,4.1,9.337,4.1T142.654-28.738Z"
                            transform="translate(-117.377 28.738)"
                        />
                    </clipPath>
                    <clipPath id="ak">
                        <path
                            className="a"
                            d="M65.433-196.607Q63.958-179.88,63.3-168.825c-.659,11.055-.632,10.59-.85,22.266s-.192,13.762,0,23.4.691,13.467.85,19.218-.3,6.6,0,11.544c.113,1.846-1.108,14.887-.85,16.677.2,1.405.5-4.875,3.4-10.156s2.9-4.857,6.622-8.1q3.724-3.243,10.739-3.908a15.634,15.634,0,0,1,7.446,3.49,23.956,23.956,0,0,1,5.064,7.249q2.335,4.613,1.657,18.66l6.445-36.444q2.125-12.153,4.072-22.071c1.947-9.918,2.421-11.651,4.106-19.594q1.685-7.943,3.412-15.371A158.815,158.815,0,0,1,87.52-176.706,120.527,120.527,0,0,1,65.433-196.607Z"
                            transform="translate(-62.295 196.607)"
                        />
                    </clipPath>
                    <clipPath id="am">
                        <path
                            className="a"
                            d="M75.675-80.285c-8.869-1.564-14.266-13-12.054-25.543s11.194-21.444,20.063-19.88,14.266,13,12.054,25.543S84.544-78.721,75.675-80.285Z"
                            transform="translate(-63.125 125.887)"
                        />
                    </clipPath>
                    <clipPath id="ao">
                        <path
                            className="a"
                            d="M61.38-101.046c-.064,6.019-.115,5.8,0,8.186q.238,4.946,1.161,19.41l.84,18.4q1.358,11.531,2.14,18.721t1.472,14.488a73.793,73.793,0,0,1,.67,10.054,80.835,80.835,0,0,1-.67,10.366L65.739,4.492q7.752,4.539,12.53,4.539T87.8,4.492l-1.76-17.114q-1.051-3.932,0-14.679C87.092-38.049,87.883-40.3,89.473-47.72s2.692-7.944,3.813-13.411,2.986-15.533,3.719-23.559q.734-8.026.635-19.351-4.45,12-9.2,15.09c-4.752,3.093-7.72,4.351-11.717,4.038q-4-.313-9.727-5.865a34.083,34.083,0,0,1-3.253-6.285c-.788-2.3-1.436-8.339-1.371-13.254C62.395-112.174,61.445-107.065,61.38-101.046Z"
                            transform="translate(-61.311 110.705)"
                        />
                    </clipPath>
                    <clipPath id="aq">
                        <path
                            className="a"
                            d="M71.46-28.738a30.492,30.492,0,0,1-3.386,7.559,46.988,46.988,0,0,1-5.806,7.768,45.9,45.9,0,0,1-4.822,4.972c-1.8,1.73-1.637,1.211-3.822,3.314A26.87,26.87,0,0,0,49.476-.769a11.194,11.194,0,0,0-1.835,4,14.572,14.572,0,0,0-.755,3.3A17.609,17.609,0,0,0,55.462,10.3C60.426,11.091,63.15,9.25,66,9.59s1.891,1.74,3.96,1.74a5.533,5.533,0,0,0,3.879-1.74q2.218-2.056,3.233-3.059t2.737-2.623A12.884,12.884,0,0,0,81.991.75c.877-1.773,1.326-1.3,2.52-2.868s1.822-1.594,3.37-2.154a18.431,18.431,0,0,1,3.942-.852q.943-.559,2.183-1.2c1.24-.641,1.844-3.016,2.393-5.351s.337-2.456,0-4.825-.634-1.158-1.35-4.676a65.685,65.685,0,0,1-1.044-7.093q-2.966,4.1-9.337,4.1T71.46-28.738Z"
                            transform="translate(-46.885 28.738)"
                        />
                    </clipPath>
                </defs>
                <g className="c" transform="translate(114.611)">
                    <g className="d" transform="translate(-705.745 -170.519)">
                        <path
                            className="b"
                            d="M75.656-378H143.91v78.97H75.656Z"
                            transform="translate(622.984 541.414)"
                            onClick={makeClickHandler("head")}
                            onMouseEnter={makeMouseEnterHandler("head")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "head"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("head")
                                            ? "#FFAE00" // 선택된 상태 주황색
                                            : "#110078", // 기본 남색
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="e" transform="translate(110.884 54.976)">
                    <g className="d" transform="translate(-702.018 -225.495)">
                        <path
                            className="b"
                            d="M73.033-339.311h75.709v56.141H73.033Z"
                            transform="translate(621.88 557.702)"
                            onClick={makeClickHandler("neck")}
                            onMouseEnter={makeMouseEnterHandler("neck")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "neck"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("neck")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="f" transform="translate(92.331 201.892)">
                    <g className="d" transform="translate(-683.465 -372.412)">
                        <path
                            className="b"
                            d="M59.976-235.922H172.957v96.049H59.976Z"
                            transform="translate(616.383 601.228)"
                            onClick={makeClickHandler("torso")}
                            onMouseEnter={makeMouseEnterHandler("torso")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "torso"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("torso")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="g" transform="translate(96.441 157.008)">
                    <g className="d" transform="translate(-687.575 -327.527)">
                        <path
                            className="b"
                            d="M62.869-267.508h104.8v65.082H62.869Z"
                            transform="translate(617.601 587.931)"
                            onClick={makeClickHandler("upper-abdomen")}
                            onMouseEnter={makeMouseEnterHandler("upper-abdomen")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "upper-abdomen"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("upper-abdomen")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="h" transform="translate(142.565 82.93)">
                    <g className="d" transform="translate(-733.699 -253.449)">
                        <path
                            className="b"
                            d="M95.328-319.639h61.323v91.09H95.328Z"
                            transform="translate(631.266 565.984)"
                            onClick={makeClickHandler("left-chest")}
                            onMouseEnter={makeMouseEnterHandler("left-chest")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-chest"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-chest")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="i" transform="translate(93.646 82.93)">
                    <g className="d" transform="translate(-684.779 -253.449)">
                        <path
                            className="b"
                            d="M60.9-228.55h61.323v-91.09H60.9Z"
                            transform="translate(616.773 565.984)"
                            onClick={makeClickHandler("right-chest")}
                            onMouseEnter={makeMouseEnterHandler("right-chest")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-chest"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-chest")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="j" transform="translate(177.508 84.794)">
                    <g className="d" transform="translate(-768.641 -255.313)">
                        <path
                            className="b"
                            d="M119.918-318.328h47.876v68.361H119.918Z"
                            transform="translate(641.618 566.536)"
                            onClick={makeClickHandler("left-shoulder")}
                            onMouseEnter={makeMouseEnterHandler("left-shoulder")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-shoulder"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-shoulder")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="k" transform="translate(191.025 120.862)">
                    <g className="d" transform="translate(-782.159 -291.381)">
                        <path
                            className="b"
                            d="M129.431-292.945h53.088v71.532H129.431Z"
                            transform="translate(645.623 577.222)"
                            onClick={makeClickHandler("left-elbow")}
                            onMouseEnter={makeMouseEnterHandler("left-elbow")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-elbow"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-elbow")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="l" transform="translate(211.052 162.133)">
                    <g className="d" transform="translate(-802.186 -332.652)">
                        <path
                            className="b"
                            d="M143.525-263.9h64.527v87.356H143.525Z"
                            transform="translate(651.556 589.449)"
                            onClick={makeClickHandler("left-wrist")}
                            onMouseEnter={makeMouseEnterHandler("left-wrist")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-wrist"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-wrist")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="m" transform="translate(248.325 230.154)">
                    <g className="d" transform="translate(-839.458 -400.674)">
                        <path
                            className="b"
                            d="M169.754-216.033h49.631v61.262H169.754Z"
                            transform="translate(662.599 609.602)"
                            onClick={makeClickHandler("left-hand")}
                            onMouseEnter={makeMouseEnterHandler("left-hand")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-hand"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-hand")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="n" transform="translate(0 230.154)">
                    <g className="d" transform="translate(-591.133 -400.674)">
                        <path
                            className="b"
                            d="M-5-154.771H44.631v-61.262H-5Z"
                            transform="translate(589.028 609.602)"
                            onClick={makeClickHandler("right-hand")}
                            onMouseEnter={makeMouseEnterHandler("right-hand")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-hand"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-hand")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="o" transform="translate(72.214 84.794)">
                    <g className="d" transform="translate(-663.348 -255.313)">
                        <path
                            className="b"
                            d="M45.82-249.967H93.7v-68.361H45.82Z"
                            transform="translate(610.423 566.536)"
                            onClick={makeClickHandler("right-shoulder")}
                            onMouseEnter={makeMouseEnterHandler("right-shoulder")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-shoulder"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-shoulder")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="p" transform="translate(53.585 120.862)">
                    <g className="d" transform="translate(-644.718 -291.381)">
                        <path
                            className="b"
                            d="M32.71-221.413H85.8v-71.532H32.71Z"
                            transform="translate(604.904 577.222)"
                            onClick={makeClickHandler("right-elbow")}
                            onMouseEnter={makeMouseEnterHandler("right-elbow")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-elbow"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-elbow")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="q" transform="translate(21.897 162.133)">
                    <g className="d" transform="translate(-613.031 -332.652)">
                        <path
                            className="b"
                            d="M10.41-176.545H74.937V-263.9H10.41Z"
                            transform="translate(595.516 589.449)"
                            onClick={makeClickHandler("right-wrist")}
                            onMouseEnter={makeMouseEnterHandler("right-wrist")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-wrist"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-wrist")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="r" transform="translate(141.633 250.654)">
                    <g className="d" transform="translate(-732.767 -421.173)">
                        <path
                            className="b"
                            d="M94.672-201.607h67.323V-59.274H94.672Z"
                            transform="translate(630.99 615.675)"
                            onClick={makeClickHandler("left-thigh")}
                            onMouseEnter={makeMouseEnterHandler("left-thigh")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-thigh"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-thigh")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="s" transform="translate(160.517 351.146)">
                    <g className="d" transform="translate(-751.651 -521.666)">
                        <path
                            className="b"
                            d="M104.7-125.416l46.112-8.131,10.477,59.417L115.176-66Z"
                            transform="translate(635.211 644.328)"
                            onClick={makeClickHandler("left-knee")}
                            onMouseEnter={makeMouseEnterHandler("left-knee")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-knee"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-knee")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="t" transform="translate(159.804 372.72)">
                    <g className="d" transform="translate(-750.937 -543.239)">
                        <path
                            className="b"
                            d="M107.459-115.7h50.55V18.241h-50.55Z"
                            transform="translate(636.373 651.839)"
                            onClick={makeClickHandler("left-ankle")}
                            onMouseEnter={makeMouseEnterHandler("left-ankle")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-ankle"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-ankle")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="u" transform="translate(166.792 489.195)">
                    <g className="d" transform="translate(-757.925 -659.714)">
                        <path
                            className="b"
                            d="M112.377-33.738h64.061V20.54H112.377Z"
                            transform="translate(638.443 686.347)"
                            onClick={makeClickHandler("left-foot")}
                            onMouseEnter={makeMouseEnterHandler("left-foot")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "left-foot"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("left-foot")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="v" transform="translate(88.521 250.654)">
                    <g className="d" transform="translate(-679.654 -421.173)">
                        <path
                            className="b"
                            d="M124.618-201.607H57.3V-59.274h67.322Z"
                            transform="translate(615.254 615.675)"
                            onClick={makeClickHandler("right-thigh")}
                            onMouseEnter={makeMouseEnterHandler("right-thigh")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-thigh"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-thigh")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="w" transform="translate(89.7 351.146)">
                    <g className="d" transform="translate(-680.834 -521.666)">
                        <path
                            className="b"
                            d="M111.452-125.416,65.34-133.546,54.863-74.129,100.975-66Z"
                            transform="translate(614.231 644.328)"
                            onClick={makeClickHandler("right-knee")}
                            onMouseEnter={makeMouseEnterHandler("right-knee")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-knee"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-knee")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="x" transform="translate(87.124 372.72)">
                    <g className="d" transform="translate(-678.257 -543.239)">
                        <path
                            className="b"
                            d="M106.862-115.7H56.311V18.241h50.55Z"
                            transform="translate(614.84 651.839)"
                            onClick={makeClickHandler("right-ankle")}
                            onMouseEnter={makeMouseEnterHandler("right-ankle")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-ankle"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-ankle")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
                <g className="y" transform="translate(66.624 489.195)">
                    <g className="d" transform="translate(-657.757 -659.714)">
                        <path
                            className="b"
                            d="M105.947-33.738H41.885V20.54h64.061Z"
                            transform="translate(608.767 686.347)"
                            onClick={makeClickHandler("right-foot")}
                            onMouseEnter={makeMouseEnterHandler("right-foot")}
                            onMouseLeave={makeMouseLeaveHandler()}
                            style={{
                                fill:
                                    hoveredPart === "right-foot"
                                        ? "#ffc73b" // Hover 시
                                        : selected.includes("right-foot")
                                            ? "#FFAE00" // 선택된 상태
                                            : "#110078", // 기본
                                cursor: "pointer",
                            }}
                        />
                    </g>
                </g>
            </svg>
            {/* 툴팁 */}

            {hoveredPart && (
                <div
                    style={{
                        position: "absolute",
                        top: tooltipPosition.y- 200,
                        left: tooltipPosition.x -180,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "12px",
                        pointerEvents: "none", // 툴팁이 클릭 이벤트를 차단하지 않도록
                    }}
                >
                    {partNamesInKorean[hoveredPart] || hoveredPart}
                </div>
            )}
        </div>
            );
            }