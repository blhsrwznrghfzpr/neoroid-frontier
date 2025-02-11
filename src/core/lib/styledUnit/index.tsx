import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  StyledDVBoxMesh,
  StyledDVColor,
  StyledDVCylinderMesh,
  StyledDVFont,
  StyledDVPBSMetallicMaterial,
  StyledDVSpace,
  StyledDVSprite,
  StyledDVUiTextUnlitMaterial,
  StyledDVUiUnlitMaterial,
} from "../../unit/package/StyledUnit/main";

const createId = () => uuidv4().replace(/-/g, "_");

type StyledColorConfig = {
  type: "Color";
  color: [number, number, number, number];
};

type StyledSpriteConfig = {
  type: "Sprite";
  url: string;
  rect?: [number, number, number, number];
  borders?: [number, number, number, number];
  scale?: number;
  filterMode?: "Bilinear" | "Trilinear" | "Anisotropic" | "Point";
  wrapModeU?: "Repeat" | "Clamp" | "Mirror" | "MirrorOnce";
  wrapModeV?: "Repeat" | "Clamp" | "Mirror" | "MirrorOnce";
};

type StyledUiUnlitMaterialConfig = {
  type: "UiUnlitMaterial";
  offsetFactor?: number;
  offsetUnits?: number;
  alphaCutoff?: number;
  alphaClip?: boolean;
  zWrite?: "Auto" | "On" | "Off";
};

type StyledUiTextUnlitMaterialConfig = {
  type: "UiTextUnlitMaterial";
  offsetFactor?: number;
  offsetUnits?: number;
  zWrite?: "Auto" | "On" | "Off";
};

type StyledPBSMetallicMaterialConfig = {
  type: "PBSMetallicMaterial";
  albedoColor?:
    | [number, number, number, number]
    | [number, number, number, number, "sRGB" | "sRGBAlpha" | "Linear"];
  metallic?: number;
  smoothness?: number;
};

type StyledMaterialConfig =
  | StyledUiUnlitMaterialConfig
  | StyledUiTextUnlitMaterialConfig
  | StyledPBSMetallicMaterialConfig;

type StyledFontConfig = {
  type: "Font";
  urls: [
    string,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
    string?,
  ];
};

type StyledBoxMeshConfig = {
  type: "BoxMesh";
  size?: [number, number, number];
};

type StyledCylinderMeshConfig = {
  type: "CylinderMesh";
  height?: number;
  radius?: number;
  sides?: number;
  caps?: boolean;
  flatShading?: boolean;
};

type StyledMeshConfig = StyledBoxMeshConfig | StyledCylinderMeshConfig;

// type StyledConfig = StyledColorConfig | StyledSpriteConfig;

export const createColor = (
  color: [number, number, number, number],
): StyledColorConfig => ({
  type: "Color",
  color,
});

export const createSprite = ({
  url,
  rect,
  borders,
  scale,
  filterMode,
  wrapModeU,
  wrapModeV,
}: {
  url: string;
  rect?: [number, number, number, number];
  borders?: [number, number, number, number];
  scale?: number;
  filterMode?: "Bilinear" | "Trilinear" | "Anisotropic" | "Point";
  wrapModeU?: "Repeat" | "Clamp" | "Mirror" | "MirrorOnce";
  wrapModeV?: "Repeat" | "Clamp" | "Mirror" | "MirrorOnce";
}): StyledSpriteConfig => ({
  type: "Sprite",
  url,
  rect,
  borders,
  scale,
  filterMode,
  wrapModeU,
  wrapModeV,
});

export const createUiUnlitMaterial = ({
  offsetFactor,
  offsetUnits,
  alphaCutoff,
  alphaClip,
  zWrite,
}: {
  offsetFactor?: number;
  offsetUnits?: number;
  alphaCutoff?: number;
  alphaClip?: boolean;
  zWrite?: "Auto" | "On" | "Off";
}): StyledUiUnlitMaterialConfig => ({
  type: "UiUnlitMaterial",
  offsetFactor,
  offsetUnits,
  alphaCutoff,
  alphaClip,
  zWrite,
});

export const createUiTextUnlitMaterial = ({
  offsetFactor,
  offsetUnits,
  zWrite,
}: {
  offsetFactor?: number;
  offsetUnits?: number;
  zWrite?: "Auto" | "On" | "Off";
}): StyledUiTextUnlitMaterialConfig => ({
  type: "UiTextUnlitMaterial",
  offsetFactor,
  offsetUnits,
  zWrite,
});

export const createPBSMetallicMaterial = ({
  albedoColor,
  metallic,
  smoothness,
}: {
  albedoColor?:
    | [number, number, number, number]
    | [number, number, number, number, "sRGB" | "sRGBAlpha" | "Linear"];
  metallic?: number;
  smoothness?: number;
}): StyledPBSMetallicMaterialConfig => ({
  type: "PBSMetallicMaterial",
  albedoColor,
  metallic,
  smoothness,
});

export const createFont = ({
  urls,
}: Omit<StyledFontConfig, "type">): StyledFontConfig => ({
  type: "Font",
  urls,
});

export const createBoxMesh = ({
  size,
}: Omit<StyledBoxMeshConfig, "type">): StyledBoxMeshConfig => ({
  type: "BoxMesh",
  size,
});

export const createCylinderMesh = ({
  height,
  radius,
  sides,
  caps,
  flatShading,
}: Omit<StyledCylinderMeshConfig, "type">): StyledCylinderMeshConfig => ({
  type: "CylinderMesh",
  height,
  radius,
  sides,
  caps,
  flatShading,
});

export type StyledColorVariable = {
  type: "Color";
  variableName: string;
};

export type StyledSpriteVariable = {
  type: "Sprite";
  variableName: string;
};

export type StyledMaterialVariable = {
  type: StyledMaterialConfig["type"];
  variableName: string;
};

export type StyledFontVariable = {
  type: "Font";
  variableName: string;
};

export type StyledMeshVariable = {
  type: StyledMeshConfig["type"];
  variableName: string;
};

export type StyledVariable =
  | StyledColorVariable
  | StyledSpriteVariable
  | StyledMaterialVariable
  | StyledFontVariable
  | StyledMeshVariable;

export const createStyle = <
  C extends { [key: string]: StyledColorConfig },
  S extends { [key: string]: StyledSpriteConfig },
  M extends { [key: string]: StyledMaterialConfig },
  F extends { [key: string]: StyledFontConfig },
  Mh extends { [key: string]: StyledMeshConfig },
>(config: {
  Color?: C;
  Sprite?: S;
  Material?: M;
  Font?: F;
  Mesh?: Mh;
}): {
  StyledSpace: React.FC<{ children: React.ReactNode }>;
  Color: {
    [key in keyof C]: StyledColorVariable;
  };
  Sprite: {
    [key in keyof S]: StyledSpriteVariable;
  };
  Material: {
    [key in keyof M]: StyledMaterialVariable;
  };
  Font: {
    [key in keyof F]: StyledFontVariable;
  };
  Mesh: {
    [key in keyof Mh]: StyledMeshVariable;
  };
} => {
  const spaceName = createId();

  const colorVariables = Object.keys(config.Color ?? []).map(
    (key): { key: keyof C; variableName: string } & StyledColorConfig => ({
      ...(config.Color?.[key] ?? {
        type: "Color",
        color: [0, 0, 0, 0],
      }),
      variableName: `${spaceName}/${createId()}`,
      key,
    }),
  );

  const spriteVariables = Object.keys(config.Sprite ?? []).map(
    (key): { key: keyof S; variableName: string } & StyledSpriteConfig => ({
      ...(config.Sprite?.[key] ?? {
        type: "Sprite",
        url: "",
      }),
      variableName: `${spaceName}/${createId()}`,
      key,
    }),
  );

  const materialVariables = Object.keys(config.Material ?? []).map(
    (key): { key: keyof M; variableName: string } & StyledMaterialConfig => ({
      ...(config.Material?.[key] ?? {
        type: "UiUnlitMaterial",
        offsetFactor: 0,
        offsetUnits: 0,
        alphaCutoff: 0,
        alphaClip: false,
        zWrite: "Auto",
      }),
      variableName: `${spaceName}/${createId()}`,
      key,
    }),
  );

  const fontVariables = Object.keys(config.Font ?? []).map(
    (key): { key: keyof F; variableName: string } & StyledFontConfig => ({
      ...(config.Font?.[key] ?? {
        type: "Font",
        urls: ["", "", "", "", "", "", "", "", "", ""],
      }),
      variableName: `${spaceName}/${createId()}`,
      key,
    }),
  );

  const meshVariables = Object.keys(config.Mesh ?? []).map(
    (key): { key: keyof Mh; variableName: string } & StyledMeshConfig => ({
      ...(config.Mesh?.[key] ?? {
        type: "BoxMesh",
        size: [1, 1, 1],
      }),
      variableName: `${spaceName}/${createId()}`,
      key,
    }),
  );

  return {
    StyledSpace: ({ children }: { children: React.ReactNode }) => (
      <StyledDVSpace spaceName={spaceName}>
        {colorVariables.map((variable) => (
          <StyledDVColor
            color={variable.color}
            key={variable.variableName}
            name={variable.variableName}
          />
        ))}
        {spriteVariables.map((variable) => (
          <StyledDVSprite
            borders={variable.borders}
            filterMode={variable.filterMode}
            key={variable.variableName}
            name={variable.variableName}
            rect={variable.rect}
            scale={variable.scale}
            url={variable.url}
            wrapModeU={variable.wrapModeU}
            wrapModeV={variable.wrapModeV}
          />
        ))}
        {materialVariables.map((variable) => {
          switch (variable.type) {
            case "UiUnlitMaterial":
              return (
                <StyledDVUiUnlitMaterial
                  alphaClip={variable.alphaClip}
                  alphaCutoff={variable.alphaCutoff}
                  key={variable.variableName}
                  name={variable.variableName}
                  offsetFactor={variable.offsetFactor}
                  offsetUnits={variable.offsetUnits}
                  zWrite={variable.zWrite}
                />
              );
            case "UiTextUnlitMaterial":
              return (
                <StyledDVUiTextUnlitMaterial
                  key={variable.variableName}
                  name={variable.variableName}
                  offsetFactor={variable.offsetFactor}
                  offsetUnits={variable.offsetUnits}
                  zWrite={variable.zWrite}
                />
              );
            case "PBSMetallicMaterial":
              return (
                <StyledDVPBSMetallicMaterial
                  albedoColor={variable.albedoColor}
                  key={variable.variableName}
                  metallic={variable.metallic}
                  name={variable.variableName}
                  smoothness={variable.smoothness}
                />
              );
          }
        })}
        {fontVariables.map((variable) => (
          <StyledDVFont
            key={variable.variableName}
            name={variable.variableName}
            url0={variable.urls[0]}
            url1={variable.urls[1]}
            url2={variable.urls[2]}
            url3={variable.urls[3]}
            url4={variable.urls[4]}
            url5={variable.urls[5]}
            url6={variable.urls[6]}
            url7={variable.urls[7]}
            url8={variable.urls[8]}
            url9={variable.urls[9]}
          />
        ))}
        {meshVariables.map((variable) => {
          switch (variable.type) {
            case "BoxMesh":
              return (
                <StyledDVBoxMesh
                  key={variable.variableName}
                  name={variable.variableName}
                  size={variable.size}
                />
              );
            case "CylinderMesh":
              return (
                <StyledDVCylinderMesh
                  caps={variable.caps}
                  flatShading={variable.flatShading}
                  height={variable.height}
                  key={variable.variableName}
                  name={variable.variableName}
                  radius={variable.radius}
                  sides={variable.sides}
                />
              );
          }
        })}
        {children}
      </StyledDVSpace>
    ),
    Color: colorVariables.reduce(
      (acc, variable) => (
        (acc[variable.key] = {
          type: variable.type,
          variableName: variable.variableName,
        }),
        acc
      ),
      {} as {
        [key in keyof C]: StyledColorVariable;
      },
    ),
    Sprite: spriteVariables.reduce(
      (acc, variable) => (
        (acc[variable.key] = {
          type: variable.type,
          variableName: variable.variableName,
        }),
        acc
      ),
      {} as {
        [key in keyof S]: StyledSpriteVariable;
      },
    ),
    Material: materialVariables.reduce(
      (acc, variable) => (
        (acc[variable.key] = {
          type: variable.type,
          variableName: variable.variableName,
        }),
        acc
      ),
      {} as {
        [key in keyof M]: StyledMaterialVariable;
      },
    ),
    Font: fontVariables.reduce(
      (acc, variable) => (
        (acc[variable.key] = {
          type: variable.type,
          variableName: variable.variableName,
        }),
        acc
      ),
      {} as {
        [key in keyof F]: StyledFontVariable;
      },
    ),
    Mesh: meshVariables.reduce(
      (acc, variable) => (
        (acc[variable.key] = {
          type: variable.type,
          variableName: variable.variableName,
        }),
        acc
      ),
      {} as {
        [key in keyof Mh]: StyledMeshVariable;
      },
    ),
  };
};
