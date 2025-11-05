import bcrypt from 'bcryptjs';
import * as usrv from '../servicios/usuariosServicios.js';

export const getUsuarios = async (_req,res)=>{ try{ res.json(await usrv.getAllUsuarios()); } catch{ res.status(500).json({message:'Error al listar usuarios'});} };
export const getUsuarioById = async (req,res)=>{ try{ const u=await usrv.getUsuarioById(req.params.id); if(!u) return res.status(404).json({message:'Usuario no encontrado'}); res.json(u);} catch{ res.status(500).json({message:'Error al obtener usuario'});} };
export const getClientes = async (_req,res)=>{ try{ res.json(await usrv.getClientes()); } catch{ res.status(500).json({message:'Error al listar clientes'});} };

export const createUsuario = async (req,res)=>{
  try{
    const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto } = req.body;
    const contrasenia_hash = bcrypt.hashSync(contrasenia, 10);
    const id = await usrv.createUsuario({ nombre, apellido, nombre_usuario, contrasenia_hash, tipo_usuario, celular, foto });
    res.status(201).json({ id });
  }catch{ res.status(500).json({message:'Error al crear usuario'}); }
};

export const updateUsuario = async (req,res)=>{
  try{
    const data = { ...req.body };
    if (data.contrasenia) {
      data.contrasenia_hash = bcrypt.hashSync(data.contrasenia, 10);
      delete data.contrasenia;
    }
    const ok = await usrv.updateUsuario(req.params.id, data);
    if (!ok) return res.status(404).json({message:'Usuario no encontrado'});
    res.json({ updated: ok });
  }catch{ res.status(500).json({message:'Error al actualizar usuario'}); }
};

export const deleteUsuario = async (req,res)=>{
  try{
    const ok = await usrv.deleteUsuario(req.params.id);
    if (!ok) return res.status(404).json({message:'Usuario no encontrado'});
    res.json({ deleted: ok });
  }catch{ res.status(500).json({message:'Error al eliminar usuario'}); }
};
