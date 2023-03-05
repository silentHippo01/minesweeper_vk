import React, { FC } from 'react';
import './face.scss';

interface FaceProps {
    state: string;
}

const Faces: FC<FaceProps> = ({ state }) => {
    return (
        <div className={'faces'}>
           <div className={state}>
           </div>
        </div>
    );
};

export default Faces;