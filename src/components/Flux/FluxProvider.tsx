import { createContext, PropsWithChildren, useContext } from "react";

export interface FluxContextProps {
  gutter: number | number[];
}

const FluxContext = createContext<FluxContextProps>({} as FluxContextProps);

export const useFlux = () => useContext(FluxContext);

const FluxProvider = ({ children, gutter = 0 }: PropsWithChildren<FluxContextProps>) => {
  console.log(gutter);
  return <FluxContext.Provider value={{ gutter }}>{children}</FluxContext.Provider>;
};

export default FluxProvider;
